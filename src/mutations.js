import Vue from 'vue'
import { MUTATIONS, STATE } from './keys'
import initialState from './state'

export default (options) => {
  return {
    [MUTATIONS.REQUEST] (state, payload) {
      Vue.set(state[STATE.PENDING], payload.key, true)
    },
    [MUTATIONS.RECEIVED] (state, payload) {
      Vue.set(state[STATE.PENDING], payload.key, false)
      if (options.cache) {
        Vue.set(state[STATE.ERROR], payload.key, false)
        Vue.set(state[STATE.FETCHED], payload.key, true)
        Vue.set(state[STATE.RESPONSE], payload.key, payload.response)
      }
    },
    [MUTATIONS.FAILED] (state, payload) {
      Vue.set(state[STATE.PENDING], payload.key, false)
      if (options.cache) {
        Vue.set(state[STATE.ERROR], payload.key, true)
        Vue.set(state[STATE.FETCHED], payload.key, false)
        Vue.set(state[STATE.RESPONSE], payload.key, payload.response)
      }
    },
    [MUTATIONS.INVALIDATE] (state, payload) {
      Vue.set(state[STATE.FETCHED], payload.key, false)
    },
    [MUTATIONS.RESET] (state) {
      Object.assign(state, initialState(options))
    },
  }
}
