import { IVxsOptions, VxsExtendedState } from './types'

export default <D, P, S>(options: IVxsOptions<D, P, S>): VxsExtendedState<D, S> => {
  const state = <VxsExtendedState<D, S>> {
    PENDING: {},
  }
  if (options.cache) {
    state.ERROR = {}
    state.FETCHED = {}
    state.DEFAULT = options.default
    state.RESPONSE = {}
  }
  if (options.store && options.store.state) {
    for (const key in options.store.state) {
      if (!options.store.state.hasOwnProperty(key)) {
        continue
      }
      (<S> state)[key] = (options.store.state)[key]

    }
  }
  return state
}
