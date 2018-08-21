import { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface VxsErrorResponse {
}

export interface VxsResponse<D> {
  data: D
}

export interface VxsOptions<D, S, P> {
  default: D
  store: VxsExtendedStore<S>
  cache: boolean
  method: VxsMethod<P, D>
}

export interface VxsMethod<P, D> {
  (_: P): Promise<VxsResponse<D>> | D
}

export interface VxsExtendedStore<S> {
  actions?: ActionTree<S, S>
  mutations?: MutationTree<S>
  getters?: GetterTree<S, S>
  state?: S
}

export interface VxsState<D> {
  PENDING: { [_: string]: boolean }
  ERROR: { [_: string]: boolean }
  FETCHED: { [_: string]: boolean }
  DEFAULT: D
  RESPONSE: { [_: string]: VxsErrorResponse | VxsResponse<D> }
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
