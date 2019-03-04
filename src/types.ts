import { ActionTree, GetterTree, MutationTree } from 'vuex'

// export interface VxsErrorResponse {}

export interface IVxsResponse<D> {
  data: D
}

export interface IVxsPromise<D> extends Promise<IVxsResponse<D>> {
}

export interface IVxsOptions<D, P = unknown, S = unknown, RS = unknown> {
  method: VxsMethod<P, D>
  default?: D
  store?: IVxsExtendedStore<D, S, RS>
  cache?: boolean
  alwaysRefetch?: boolean
}

export type VxsMethod<P, D> = (_: P) => IVxsPromise<D> | D

export interface IVxsExtendedStore<D, S = object, RS = object> {
  actions?: ActionTree<VxsExtendedState<D, S>, RS>
  mutations?: MutationTree<VxsExtendedState<D, S>>
  getters?: GetterTree<VxsExtendedState<D, S>, RS>
  state?: S
}

export interface IVxsState<D> {
  PENDING: { [_: string]: boolean }
  ERROR: { [_: string]: boolean }
  FETCHED: { [_: string]: boolean }
  DEFAULT?: D
  RESPONSE: { [_: string]: IVxsResponse<D> }
}

export interface IVxsModuleState {
  [_: string]: IVxsState<unknown>
}

export interface IMockState<D> {
  error?: boolean
  pending?: boolean,
  response?: IVxsResponse<D>
  data?: D
}

export type VxsExtendedState<D, S> = IVxsState<D> & S

// method staat hier vanwege de setMethod functie
interface IVxsActionTreeExtension<P, D> {
  method: VxsMethod<P, D>
}

export type VxsActionTree<S, RS, P, D> = IVxsActionTreeExtension<P, D> & ActionTree<VxsExtendedState<D, S>, RS>

export interface IVxsMutationPayload {
  key: string
  response: object
  catched: boolean
}

export interface IVxsPayload {
  // tslint:disable-next-line:no-any
  errorHandler?: (_: any) => boolean
}
