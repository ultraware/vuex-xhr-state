export const GLOBAL_NAMESPACE = 'globalXhrState'
const MUTATIONS = {
  ADD_PENDING: 'ADD_PENDING',
  REMOVE_PENDING: 'END_PENDING',
  SET_ERROR: 'SET_ERROR',
  RESET_ERROR: 'RESET_ERROR',
}
export const GLOBAL_ACTIONS = {
  REQUEST: 'REQUEST',
  RECEIVED: 'END_PENDING',
  FAILED: 'SET_ERROR',
  RESET_ERROR: 'RESET_ERROR',
}

export const GLOBAL_GETTERS = {
  ANY_PENDING: 'ANY_PENDING',
  // ANY_ERROR: 'ANY_ERROR',
  LAST_ERROR_RESPONSE: 'LAST_ERROR_RESPONSE',
}

const ACTIONS = GLOBAL_ACTIONS

const unique = array => {
  return array.filter((el, index, arr) => index === arr.indexOf(el))
}

export const globalState = {
  namespaced: true,
  state: {
    activeLoaders: [],
    // inError: false,
    last_error: {},
  },
  getters: {
    [GLOBAL_GETTERS.ANY_PENDING]: state => state.activeLoaders.length > 0,
    // [GLOBAL_GETTERS.ANY_ERROR]: state => state.inError,
    [GLOBAL_GETTERS.LAST_ERROR_RESPONSE]: state => state.last_error,
  },
  actions: {
    [ACTIONS.REQUEST]: ({commit}, key) =>
      commit(MUTATIONS.ADD_PENDING, key),
    [ACTIONS.RECEIVED]: ({commit}, key) =>
      commit(MUTATIONS.REMOVE_PENDING, key),
    [ACTIONS.FAILED]: ({commit}, payload) => {
      commit(MUTATIONS.SET_ERROR, payload)
      commit(MUTATIONS.REMOVE_PENDING, payload.key)
    },
    // [ACTIONS.RESET_ERROR]: ({commit}) =>
    //   commit(MUTATIONS.RESET_ERROR),
  },
  mutations: {
    [MUTATIONS.ADD_PENDING] (state, key) {
      state.activeLoaders.push(key)
      state.activeLoaders = unique(state.activeLoaders)
    },
    [MUTATIONS.REMOVE_PENDING] (state, key) {
      state.activeLoaders = unique(state.activeLoaders).filter(
        p => p !== key,
      )
    },
    [MUTATIONS.SET_ERROR] (state, payload) {
      // state.errorResponse[payload.key] = payload.response
      state.last_error = payload.response
      // state.inError = true
    },
    // [MUTATIONS.RESET_ERROR] (state) {
    //   state.inError = false
    //   state.errorResponse = {}
    // },
  },
}
