import { GET, STATE } from './keys'
import { payloadToKey } from './helpers'

export default (cache) => {
  const result = {
    [GET.PENDING]: (state) => (payload) => {
      return state[STATE.PENDING][payloadToKey(payload)]
    },
  }
  if (cache) {
    result[GET.HAS_ERROR] = (state) => (payload) => {
      return state[STATE.ERROR][payloadToKey(payload)]
    }
    result[GET.FETCHED] = (state) => (payload) => {
      return state[STATE.FETCHED][payloadToKey(payload)]
    }
    result[GET.DATA] = (state, getters, store) => (payload) => {
      const key = payloadToKey(payload)
      if (state[STATE.RESPONSE][key] && !state[STATE.ERROR][key]) {
        return state[STATE.RESPONSE][key].data
      }
      return state[STATE.DEFAULT]
    }
    result[GET.RESPONSE] = (state) => (payload) => state[STATE.RESPONSE][payloadToKey(payload)]

    result[GET.PAYLOAD_KEYS] = state => () => Object.keys(state[STATE.RESPONSE])
  }
  return result
}
