import { MutationTree } from 'vuex'
import { MUTATIONS } from './keys'
import initialState from './state'
import { IVxsMutationPayload, IVxsOptions, IVxsState, VxsExtendedState } from './types'

export default <D, P, S, RS>(options: IVxsOptions<D, P, S, RS>): MutationTree<VxsExtendedState<D, S>> => {
  return <MutationTree<VxsExtendedState<D, S>>> {
    [MUTATIONS.REQUEST](state: IVxsState<S>, payload: IVxsMutationPayload): void {
      state.PENDING = Object.assign({}, state.PENDING, {[payload.key]: true})
    },
    [MUTATIONS.RECEIVED](state: IVxsState<S>, payload: IVxsMutationPayload): void {
      state.PENDING = Object.assign({}, state.PENDING, {[payload.key]: false})
      if (options.cache) {
        state.ERROR = Object.assign({}, state.ERROR, {[payload.key]: false})
        state.FETCHED = Object.assign({}, state.FETCHED, {[payload.key]: true})
        state.RESPONSE = Object.assign({}, state.RESPONSE, {[payload.key]: payload.response})
      }
    },
    [MUTATIONS.FAILED](state: IVxsState<S>, payload: IVxsMutationPayload): void {
      state.PENDING = Object.assign({}, state.PENDING, {[payload.key]: false})
      if (options.cache) {
        state.ERROR = Object.assign({}, state.ERROR, {[payload.key]: true})
        state.FETCHED = Object.assign({}, state.FETCHED, {[payload.key]: false})
        state.RESPONSE = Object.assign({}, state.RESPONSE, {[payload.key]: payload.response})
      }
    },
    [MUTATIONS.INVALIDATE](state: IVxsState<S>, payload: IVxsMutationPayload): void {
      state.FETCHED = Object.assign({}, state.FETCHED, {[payload.key]: false})
    },
    [MUTATIONS.RESET](state: VxsExtendedState<D, S>): void {
      Object.assign(state, initialState(options))
    },
  }
}
