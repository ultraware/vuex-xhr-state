import { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface VxsErrorResponse {
}

export interface VxsResponse<D> {
  data: D
}

export interface VxsPromise<D> extends Promise<VxsResponse<D>> {
}

export interface VxsOptions<D, S = any, P = any, RS = any> {
  method: VxsMethod<P, D>
  default?: D
  store?: VxsExtendedStore<D, S, RS>
  cache?: boolean
}

export interface VxsMethod<P, D> {
  (_: P): VxsPromise<D> | D
}

export interface VxsExtendedStore<D, S = object, RS = object> {
  actions?: ActionTree<VxsExtendedState<D, S>, RS>
  mutations?: MutationTree<VxsExtendedState<D, S>>
  getters?: GetterTree<VxsExtendedState<D, S>, RS>
  state?: S
}

export interface VxsState<D> {
  PENDING: { [_: string]: boolean }
  ERROR: { [_: string]: boolean }
  FETCHED: { [_: string]: boolean }
  DEFAULT?: D
  RESPONSE: { [_: string]: VxsResponse<D> | VxsErrorResponse }
}

export interface VxsModuleState {
  [_: string]: VxsState<any>
}

export interface MockState<D> {
  error?: boolean
  pending?: boolean,
  response?: VxsResponse<D>
  data?: D
}

export type VxsExtendedState<D, S> = VxsState<D> & S

// method staat hier vanwege de setMethod functie
interface VxsActionTreeExtension<P, D> {
  method: VxsMethod<P, D>
}

export type VxsActionTree<S, RS, P, D> = VxsActionTreeExtension<P, D> & ActionTree<VxsExtendedState<D, S>, RS>
