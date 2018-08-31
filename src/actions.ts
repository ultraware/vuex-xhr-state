import { ACTION, GET, MUTATIONS } from './keys'
import { payloadToKey } from './helpers'
import { GLOBAL_ACTIONS, GLOBAL_NAMESPACE } from './globalXhrState'
import { ActionContext } from 'vuex'
import { VxsActionTree, VxsExtendedState, VxsMethod, VxsResponse } from './types'

export default <D, P, S, RS> (cache: boolean, method: VxsMethod<P, D>, inValidateGroup: () => void): VxsActionTree<S, RS, P, D> => {
  const result = <VxsActionTree<S, RS, P, D>>{
    [ACTION.SEND]: function (store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P): Promise<VxsResponse<D>> {
      const methodPromise = runMethod(result.method, store, payload)
      methodPromise
        .then(() => inValidateGroup())
      return methodPromise
    },

    [ACTION.FETCH]: function (store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P): Promise<VxsResponse<D>> {
      if (cache && store.getters[GET.PENDING](payload) && store.getters[GET.PENDING](payload)) {
        return getResolvingPromiseFromGetter(store, payload)
      }
      if (cache && store.getters[GET.FETCHED](payload) && store.getters[GET.FETCHED](payload)) {
        return getResolvingPromiseFromGetter(store, payload)
      }
      return runMethod(result.method, store, payload)
    },

    [ACTION.RESET]: function (store: ActionContext<VxsExtendedState<D, S>, RS>): void {
      store.commit(MUTATIONS.RESET)
    },
  }
  if (cache) {
    result[ACTION.FORCE_FETCH] = (store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P) => {
      return runMethod(result.method, store, payload)
    }
    result[ACTION.INVALIDATE] = (store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P) => {
      const key = payloadToKey(payload)
      store.commit(MUTATIONS.INVALIDATE, {key})
    }

    result[ACTION.INVALIDATE_ALL] = (store: ActionContext<VxsExtendedState<D, S>, RS>) => {
      const payloadKeys = store.getters[GET.PAYLOAD_KEYS]()
      payloadKeys.forEach((key: string) => store.commit(MUTATIONS.INVALIDATE, {key}))
    }
  }
  result.method = method
  return result

  function runMethod (method: VxsMethod<P, D>, store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P) {
    let prom
    const result = method(payload)
    const key = payloadToKey(payload)
    const uniqueId = Math.random()

    // @ts-ignore
    if (result.then) {
      prom = <Promise<VxsResponse<D>>>result
      prom.then(function (response: VxsResponse<D>) {
        mutateReceived(store, key, uniqueId, response)
      }).catch((response) => {
        mutateFailed(store, key, uniqueId, response)
      })
    } else {
      const data = <D>result
      prom = getResolvingPromise({
        data,
      })
      mutateReceived(store, key, uniqueId, {
        data,
      })
    }
    store.commit(MUTATIONS.REQUEST, {key})
    store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.REQUEST}`, uniqueId, {root: true})
    return prom
  }

  function mutateReceived (store: ActionContext<VxsExtendedState<D, S>, RS>, key: string, uniqueId: number, response: VxsResponse<D>) {
    store.commit(MUTATIONS.RECEIVED, {key, response})
    store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.RECEIVED}`, uniqueId, {root: true})
  }

  function mutateFailed (store: ActionContext<VxsExtendedState<D, S>, RS>, key: string, uniqueId: number, response: VxsResponse<D>) {
    store.commit(MUTATIONS.FAILED, {key, response})
    store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.FAILED}`, {key: uniqueId, response}, {root: true})
  }

  function getResolvingPromiseFromGetter (store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P): Promise<VxsResponse<D>> {
    return getResolvingPromise(store.getters[GET.RESPONSE](payload))
  }

  function getResolvingPromise (data: VxsResponse<D>): Promise<VxsResponse<D>> {
    return new Promise(function (resolve) {
      resolve(data)
    })
  }
}

