import { ActionContext } from 'vuex'
import { IVxsMutationPayload } from './types'

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

const unique = (array: string[]): string[] => {
  return array.filter((el, index, arr) => index === arr.indexOf(el))
}

interface IGlobalState {
  activeLoaders: string[]
  last_error: object
}

export const globalStore = {
  namespaced: true,
  state: {
    activeLoaders: [],
    // inError: false,
    last_error: {},
  },
  getters: {
    [GLOBAL_GETTERS.ANY_PENDING]: (state: IGlobalState): boolean => state.activeLoaders.length > 0,
    // [GLOBAL_GETTERS.ANY_ERROR]: state => state.inError,
    [GLOBAL_GETTERS.LAST_ERROR_RESPONSE]: (state: IGlobalState): object => state.last_error,
  },
  actions: {
    [ACTIONS.REQUEST]: ({commit}: ActionContext<unknown, unknown>, key: string): void =>
      commit(MUTATIONS.ADD_PENDING, key),
    [ACTIONS.RECEIVED]: ({commit}: ActionContext<unknown, unknown>, key: string): void =>
      commit(MUTATIONS.REMOVE_PENDING, key),
    [ACTIONS.FAILED]: ({commit}: ActionContext<unknown, unknown>, payload: IVxsMutationPayload): void => {
      commit(MUTATIONS.SET_ERROR, payload)
      commit(MUTATIONS.REMOVE_PENDING, payload.key)
    },
  },
  mutations: {
    [MUTATIONS.ADD_PENDING](state: IGlobalState, key: string): void {
      state.activeLoaders.push(key)
      state.activeLoaders = unique(state.activeLoaders)
    },
    [MUTATIONS.REMOVE_PENDING](state: IGlobalState, key: string): void {
      state.activeLoaders = unique(state.activeLoaders).filter((p) => p !== key)
    },
    [MUTATIONS.SET_ERROR](state: IGlobalState, payload: IVxsMutationPayload): void {
      state.last_error = payload.response
    },
  },
}
