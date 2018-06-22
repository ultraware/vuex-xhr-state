import { ACTION, GET, MUTATIONS } from './keys'
import { payloadToKey } from './helpers'
import { GLOBAL_ACTIONS, GLOBAL_NAMESPACE } from './globalXhrState'

export default (cache, method, vuexXhr) => {
  const result = {
    [ACTION.SEND]: function (store, payload) {
      return runMethod(result.method, store, payload)
        .then(() => vuexXhr.inValidateGroup())
    },

    [ACTION.FETCH]: function (store, payload) {
      if (cache && store.getters[GET.PENDING](payload) && store.getters[GET.PENDING](payload)) {
        return getResolvingPromiseFromGetter(store, payload)
      }
      if (cache && store.getters[GET.FETCHED](payload) && store.getters[GET.FETCHED](payload)) {
        return getResolvingPromiseFromGetter(store, payload)
      }
      return runMethod(result.method, store, payload)
    },

    [ACTION.RESET]: function (store) {
      store.commit(MUTATIONS.RESET)
    },
  }
  if (cache) {
    result[ACTION.FORCE_FETCH] = (store, payload) => {
      return runMethod(result.method, store, payload)
    }
    result[ACTION.INVALIDATE] = (store, payload) => {
      const key = payloadToKey(payload)
      store.commit(MUTATIONS.INVALIDATE, {key})
    }

    result[ACTION.INVALIDATE_ALL] = (store) => {
      const payloadKeys = store.getters[GET.PAYLOAD_KEYS]()
      payloadKeys.forEach(key => store.commit(MUTATIONS.INVALIDATE, {key}))
    }
  }
  result.method = method
  return result
}

function runMethod (method, store, payload) {
  let prom
  const result = method(payload)
  const key = payloadToKey(payload)
  const uniqueId = Math.random()
  if (result.then) {
    prom = result
    prom.then(function (response) {
      mutateReceived(store, key, uniqueId, response)
    }).catch((response) => {
      mutateFailed(store, key, uniqueId.response)
    })
  } else {
    prom = getResolvingPromise({
      data: result,
    })
    mutateReceived(store, key, uniqueId, {
      data: result,
    })
  }
  store.commit(MUTATIONS.REQUEST, {key})
  store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.REQUEST}`, uniqueId, {root: true})
  return prom
}

function mutateReceived (store, key, uniqueId, response) {
  store.commit(MUTATIONS.RECEIVED, {key, response})
  store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.RECEIVED}`, uniqueId, {root: true})
}

function mutateFailed (store, key, uniqueId, response) {
  store.commit(MUTATIONS.FAILED, {key, response})
  store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.FAILED}`, {key: uniqueId, response}, {root: true})
}

function getResolvingPromiseFromGetter (store, payload) {
  return getResolvingPromise(store.getters[GET.RESPONSE](payload))
}

function getResolvingPromise (data) {
  return new Promise(function (resolve) {
    resolve(data)
  })
}
