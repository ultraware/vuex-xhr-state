import { ACTION, GET, MUTATIONS } from './keys'
import { payloadToKey } from './helpers'

export default (cache, method) => {
  const result = {
    [ACTION.FETCH] (store, payload) {
      if (cache && store.getters[ GET.PENDING ](payload) && store.getters[ GET.PENDING ](payload)) {
        return
      }
      if (cache && store.getters[ GET.FETCHED ](payload) && store.getters[ GET.FETCHED ](payload)) {
        return
      }

      fetch(method, store, payload)
    },
  }
  if (cache) {
    result[ ACTION.FORCE_FETCH ] = (store, payload) => {
      fetch(method, store, payload)
    }
  }
  return result
}

function fetch (method, store, payload) {
  const prom = method(payload)
  const key = payloadToKey(payload)
  prom.then(function (response) {
    store.commit(MUTATIONS.RECEIVED, { key, response })
  }).catch((response) => {
    store.commit(MUTATIONS.FAILED, { key, response })
  })
  store.commit(MUTATIONS.REQUEST, { key })
  return prom
}
