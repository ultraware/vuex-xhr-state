import { ActionContext } from 'vuex'
import { VxsErrorResponse } from './types'

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
  ANY_ERROR: 'ANY_ERROR',
  LAST_ERROR_RESPONSE: 'LAST_ERROR_RESPONSE',
}

const ACTIONS = GLOBAL_ACTIONS

const unique = (array: Array<string>) => {
  return array.filter((el, index, arr) => index === arr.indexOf(el))
}

interface GlobalState {
  activeLoaders: Array<string>
  last_error: VxsErrorResponse
}

interface GlobalPayload {
  key: string
  response: VxsErrorResponse
}

export const globalStore = {
  namespaced: true,
  state: {
    activeLoaders: [],
    // inError: false,
    last_error: {},
  },
  getters: {
    [GLOBAL_GETTERS.ANY_PENDING]: (state: GlobalState) => state.activeLoaders.length > 0,
    // [GLOBAL_GETTERS.ANY_ERROR]: state => state.inError,
    [GLOBAL_GETTERS.LAST_ERROR_RESPONSE]: (state: GlobalState) => state.last_error,
  },
  actions: {
    [ACTIONS.REQUEST]: ({commit}: ActionContext<any, any>, key: string) =>
      commit(MUTATIONS.ADD_PENDING, key),
    [ACTIONS.RECEIVED]: ({commit}: ActionContext<any, any>, key: string) =>
      commit(MUTATIONS.REMOVE_PENDING, key),
    [ACTIONS.FAILED]: ({commit}: ActionContext<any, any>, payload: GlobalPayload) => {
      commit(MUTATIONS.SET_ERROR, payload)
      commit(MUTATIONS.REMOVE_PENDING, payload.key)
    },
  },
  mutations: {
    [MUTATIONS.ADD_PENDING] (state: GlobalState, key: string) {
      state.activeLoaders.push(key)
      state.activeLoaders = unique(state.activeLoaders)
    },
    [MUTATIONS.REMOVE_PENDING] (state: GlobalState, key: string) {
      state.activeLoaders = unique(state.activeLoaders).filter(p => p !== key)
    },
    [MUTATIONS.SET_ERROR] (state: GlobalState, payload: GlobalPayload) {
      state.last_error = payload.response
    },
  },
}
