import { ActionContext } from 'vuex'
import { GLOBAL_ACTIONS, GLOBAL_NAMESPACE } from './globalXhrState'
import { payloadToKey } from './helpers'
import { ACTION, GET, MUTATIONS } from './keys'
import { IVxsResponse, VxsActionTree, VxsExtendedState, VxsMethod } from './types'

export default <D, P, S, RS>(
  cache: boolean,
  method: VxsMethod<P, D>,
  inValidateGroup: () => void,
): VxsActionTree<S, RS, P, D> => {
  let fetchPromise: Promise<IVxsResponse<D>> | null = null
  const result = <VxsActionTree<S, RS, P, D>>{
    [ACTION.SEND](store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P): Promise<IVxsResponse<D>> {
      const methodPromise = runMethod(result.method, store, payload)
      methodPromise
        .then(() => inValidateGroup())
      return methodPromise
    },

    [ACTION.FETCH](store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P): Promise<IVxsResponse<D>> {
      if (cache && store.getters[GET.PENDING](payload) && store.getters[GET.PENDING](payload)) {
        if (!fetchPromise) {
          return getResolvingPromiseFromGetter(store, payload)
        }
        return fetchPromise
      }
      if (cache && store.getters[GET.FETCHED](payload) && store.getters[GET.FETCHED](payload)) {
        return getResolvingPromiseFromGetter(store, payload)
      }
      fetchPromise = runMethod(result.method, store, payload)
      fetchPromise.finally(() => {
        fetchPromise = null
      })
      return fetchPromise
    },

    [ACTION.RESET](store: ActionContext<VxsExtendedState<D, S>, RS>): void {
      store.commit(MUTATIONS.RESET)
    },
  }
  if (cache) {
    result[ACTION.FORCE_FETCH] = (
      store: ActionContext<VxsExtendedState<D, S>, RS>,
      payload: P,
    ): Promise<IVxsResponse<D>> => {
      return runMethod(result.method, store, payload)
    }
    result[ACTION.INVALIDATE] = (store: ActionContext<VxsExtendedState<D, S>, RS>, payload: P): void => {
      const key = payloadToKey(payload)
      store.commit(MUTATIONS.INVALIDATE, { key })
    }

    result[ACTION.INVALIDATE_ALL] = (store: ActionContext<VxsExtendedState<D, S>, RS>): void => {
      const payloadKeys = store.getters[GET.PAYLOAD_KEYS]()
      payloadKeys.forEach((key: string) => store.commit(MUTATIONS.INVALIDATE, { key }))
    }
  }
  result.method = method
  return result

  function runMethod(
    vxsMethod: VxsMethod<P, D>,
    store: ActionContext<VxsExtendedState<D, S>, RS>,
    payload: P,
  ): Promise<IVxsResponse<D>> {
    let prom
    const reply = vxsMethod(payload)
    const key = payloadToKey(payload)
    const uniqueId = Math.random()

    // @ts-ignore
    if (reply.then) {
      prom = <Promise<IVxsResponse<D>>>reply
      prom.then((response: IVxsResponse<D>): void => {
        mutateReceived(store, key, uniqueId, response)
      }).catch((response): void => {
        mutateFailed(store, key, uniqueId, response)
      })
    } else {
      const data = <D>reply
      prom = getResolvingPromise({
        data,
      })
      mutateReceived(store, key, uniqueId, {
        data,
      })
    }
    store.commit(MUTATIONS.REQUEST, { key })
    store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.REQUEST}`, uniqueId, { root: true })
    return prom
  }

  function mutateReceived(
    store: ActionContext<VxsExtendedState<D, S>, RS>,
    key: string, uniqueId: number,
    response: IVxsResponse<D>,
  ): void {
    store.commit(MUTATIONS.RECEIVED, { key, response })
    store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.RECEIVED}`, uniqueId, { root: true })
  }

  function mutateFailed(
    store: ActionContext<VxsExtendedState<D, S>, RS>,
    key: string,
    uniqueId: number,
    response: IVxsResponse<D>,
  ): void {
    store.commit(MUTATIONS.FAILED, { key, response })
    store.dispatch(
      `${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.FAILED}`,
      { key: uniqueId, response }, { root: true },
    )
  }

  function getResolvingPromiseFromGetter(
    store: ActionContext<VxsExtendedState<D, S>, RS>,
    payload: P,
  ): Promise<IVxsResponse<D>> {
    return getResolvingPromise(store.getters[GET.RESPONSE](payload))
  }

  function getResolvingPromise(data: IVxsResponse<D>): Promise<IVxsResponse<D>> {
    return new Promise((resolve: (_: IVxsResponse<D>) => unknown): void => {
      resolve(data)
    })
  }
}
