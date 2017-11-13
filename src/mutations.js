import Vue from 'vue'
import { MUTATIONS, STATE } from './keys'

export default (cache) => {
  return {
    [MUTATIONS.REQUEST] (state, payload) {
      Vue.set(state[ STATE.PENDING ], payload.key, true)
    },
    [MUTATIONS.RECEIVED] (state, payload) {
      Vue.set(state[ STATE.PENDING ], payload.key, false)
      if (cache) {
        Vue.set(state[ STATE.ERROR ], payload.key, false)
        Vue.set(state[ STATE.FETCHED ], payload.key, true)
        Vue.set(state[ STATE.RESPONSE ], payload.key, payload.response)
      }
    },
    [MUTATIONS.FAILED] (state, payload) {
      Vue.set(state[ STATE.PENDING ], payload.key, false)
      if (cache) {
        Vue.set(state[ STATE.ERROR ], payload.key, true)
        Vue.set(state[ STATE.FETCHED ], payload.key, true)
        Vue.set(state[ STATE.RESPONSE ], payload.key, payload.response)
      }
    },
  }
}
