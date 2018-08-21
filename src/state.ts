import { VxsExtendedState, VxsOptions } from './types'

export default <D, S, P> (options: VxsOptions<D, S, P>): VxsExtendedState<D, S> => {
  const state = <VxsExtendedState<D, S>>{
    PENDING: {},
  }
  if (options.cache) {
    state['ERROR'] = {}
    state['FETCHED'] = {}
    state['DEFAULT'] = options.default
    state['RESPONSE'] = {}
  }
  if (options.store && options.store.state) {
    for (let key in options.store.state) {
      (<any>state)[key] = (<any>options.store.state)[key]
    }
  }
  return state
}
