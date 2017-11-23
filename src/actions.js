import { ACTION, GET, MUTATIONS } from './keys'
import { payloadToKey } from './helpers'
import { GLOBAL_ACTIONS, GLOBAL_NAMESPACE } from './globalXhrState'

export default (cache, method) => {
  const result = {
    [ACTION.FETCH]: function (store, payload) {
      if (cache && store.getters[GET.PENDING](payload) && store.getters[GET.PENDING](payload)) {
        return getResolvingPromise(store, payload)
      }
      if (cache && store.getters[GET.FETCHED](payload) && store.getters[GET.FETCHED](payload)) {
        return getResolvingPromise(store, payload)
      }
      return fetch(result.method, store, payload)
    },
  }
  if (cache) {
    result[ACTION.FORCE_FETCH] = (store, payload) => {
      return fetch(result.method, store, payload)
    }
  }
  result.method = method
  return result
}

function fetch (method, store, payload) {
  const prom = method(payload)
  const key = payloadToKey(payload)
  const uniqueId = Math.random()
  prom.then(function (response) {
    store.commit(MUTATIONS.RECEIVED, {key, response})
    store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.RECEIVED}`, uniqueId, {root: true})
  }).catch((response) => {
    store.commit(MUTATIONS.FAILED, {key, response})
    store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.FAILED}`, {key: uniqueId, response}, {root: true})
  })
  store.commit(MUTATIONS.REQUEST, {key})
  store.dispatch(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.REQUEST}`, uniqueId, {root: true})
  return prom
}

function getResolvingPromise (store, payload) {
  return new Promise(function (resolve) {
    resolve(store.getters[GET.RESPONSE](payload))
  })
}

// export const mocActions = (cache) => {
//   const result = {
//     [ACTION.FETCH]: sinon.stub(),
//   }
//   if (cache) {
//     result[ACTION.FORCE_FETCH] = sinon.stub()
//   }
//   return result
// }
