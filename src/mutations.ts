import { MUTATIONS, STATE } from './keys'
import initialState from './state'

export default (options) => {
  return {
    [MUTATIONS.REQUEST] (state, payload) {
      state[STATE.PENDING] = Object.assign({}, state[STATE.PENDING], {[payload.key]: true})
    },
    [MUTATIONS.RECEIVED] (state, payload) {
      state[STATE.PENDING] = Object.assign({}, state[STATE.PENDING], {[payload.key]: false})
      if (options.cache) {
        state[STATE.ERROR] = Object.assign({}, state[STATE.ERROR], {[payload.key]: false})
        state[STATE.FETCHED] = Object.assign({}, state[STATE.FETCHED], {[payload.key]: true})
        state[STATE.RESPONSE] = Object.assign({}, state[STATE.RESPONSE], {[payload.key]: payload.response})
      }
    },
    [MUTATIONS.FAILED] (state, payload) {
      state[STATE.PENDING] = Object.assign({}, state[STATE.PENDING], {[payload.key]: false})
      if (options.cache) {
        state[STATE.ERROR] = Object.assign({}, state[STATE.ERROR], {[payload.key]: true})
        state[STATE.FETCHED] = Object.assign({}, state[STATE.FETCHED], {[payload.key]: false})
        state[STATE.RESPONSE] = Object.assign({}, state[STATE.RESPONSE], {[payload.key]: payload.response})
      }
    },
    [MUTATIONS.INVALIDATE] (state, payload) {
      state[STATE.FETCHED] = Object.assign({}, state[STATE.FETCHED], {[payload.key]: false})
    },
    [MUTATIONS.RESET] (state) {
      Object.assign(state, initialState(options))
    },
  }
}
