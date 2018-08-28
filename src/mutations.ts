import { MUTATIONS } from './keys'
import initialState from './state'
import { MutationTree } from 'vuex'
import { VxsExtendedState, VxsOptions, VxsState } from './types'

export default <D, S> (options: VxsOptions<D, S, any>): MutationTree<VxsExtendedState<D, S>> => {
  return <MutationTree<VxsExtendedState<D, S>>>{
    [MUTATIONS.REQUEST] (state: VxsState<S>, payload: any) {
      state['PENDING'] = Object.assign({}, state['PENDING'], {[payload.key]: true})
    },
    [MUTATIONS.RECEIVED] (state: VxsState<S>, payload: any) {
      state['PENDING'] = Object.assign({}, state['PENDING'], {[payload.key]: false})
      if (options.cache) {
        state['ERROR'] = Object.assign({}, state['ERROR'], {[payload.key]: false})
        state['FETCHED'] = Object.assign({}, state['FETCHED'], {[payload.key]: true})
        state['RESPONSE'] = Object.assign({}, state['RESPONSE'], {[payload.key]: payload.response})
      }
    },
    [MUTATIONS.FAILED] (state: VxsState<S>, payload: any) {
      state['PENDING'] = Object.assign({}, state['PENDING'], {[payload.key]: false})
      if (options.cache) {
        state['ERROR'] = Object.assign({}, state['ERROR'], {[payload.key]: true})
        state['FETCHED'] = Object.assign({}, state['FETCHED'], {[payload.key]: false})
        state['RESPONSE'] = Object.assign({}, state['RESPONSE'], {[payload.key]: payload.response})
      }
    },
    [MUTATIONS.INVALIDATE] (state: VxsState<S>, payload: any) {
      state['FETCHED'] = Object.assign({}, state['FETCHED'], {[payload.key]: false})
    },
    [MUTATIONS.RESET] (state) {
      Object.assign(state, initialState(options))
    },
  }
}
