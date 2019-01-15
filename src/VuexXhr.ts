import { GetterTree, Module, MutationTree } from 'vuex'
import makeActions from './actions'
import makeGetters from './getters'
import { payloadToKey } from './helpers'
import { ACTION, GET } from './keys'
import makeMutations from './mutations'
import makeState from './state'
import { IVxsExtendedStore, IVxsOptions, IVxsResponse, VxsActionTree, VxsExtendedState, VxsMethod } from './types'
import { VuexXhrCreator } from './VuexXhrCreator'

const SEPARATOR = '/'

interface IMapResult<P> {
  key: string,
  payload: P,
}

export default class VuexXhr<S, RS, P, D> implements Module<VxsExtendedState<D, S>, RS> {
  public readonly state: VxsExtendedState<D, S>
  public readonly namespaced: boolean
  public namespace: string = ''
  public mutations: MutationTree<VxsExtendedState<D, S>>
  public actions: VxsActionTree<S, RS, P, D>
  public getters: GetterTree<VxsExtendedState<D, S>, RS>
  public options: IVxsOptions<D, P, S>
  private vuexXhrCreator?: VuexXhrCreator

  constructor(options: IVxsOptions<D, P, S>) {
    this.namespaced = true
    this.options = options
    this.state = makeState<D, P, S>(this.options)
    this.mutations = makeMutations<D, P, S>(this.options)

    this.actions = makeActions<D, P, S, RS>(
      this.options.cache !== undefined ? this.options.cache : true,
      this.options.method,
      this.inValidateGroup,
    )
    this.getters = makeGetters<D, P, RS>(this.options.cache ? this.options.cache : true)

    if (this.options.store) {
      this.mergeStore(this.options.store)
    }
  }

  public setNamespace = (namespace: string): void => {
    this.namespace = namespace
  }

  public mapPending = (payload: P): IMapResult<P> => {
    return {key: this.namespace + SEPARATOR + GET.PENDING, payload}
  }

  public mapHasError = (payload: P): IMapResult<P> => {
    if (!this.options.cache) {
      throw new Error('mapHasError is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.HAS_ERROR, payload}
  }

  public mapFetched = (payload: P): IMapResult<P> => {
    if (!this.options.cache) {
      throw new Error('mapFetched is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.FETCHED, payload}
  }

  public mapData = (payload: P): IMapResult<P> => {
    if (!this.options.cache) {
      throw new Error('mapData is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.DATA, payload}
  }

  public mapResponse = (payload: P): IMapResult<P> => {
    if (!this.options.cache) {
      throw new Error('mapResponse is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.RESPONSE, payload}
  }

  // tslint:disable-next-line:no-any
  public pending = (getters: any[], payload: P): unknown => {
    const getter = this.findGetter(getters, GET.PENDING)
    return getter(payload)
  }

  // tslint:disable-next-line:no-any
  public hasError = (getters: any[], payload?: P): unknown => {
    if (!this.options.cache) {
      throw new Error('hasError is not available on this object')
    }
    const getter = this.findGetter(getters, GET.HAS_ERROR)
    return getter(payload)
  }

  // tslint:disable-next-line:no-any
  public fetched = (getters: any[], payload?: P): unknown => {
    if (!this.options.cache) {
      throw new Error('fetched is not available on this object')
    }
    const getter = this.findGetter(getters, GET.FETCHED)
    return getter(payload)
  }

  // tslint:disable-next-line:no-any
  public data = (getters: any[], payload?: P): D => {
    if (!this.options.cache) {
      throw new Error('data is not available on this object')
    }
    const getter = this.findGetter(getters, GET.DATA)
    return getter(payload)
  }

  // tslint:disable-next-line:no-any
  public response = (getters: any[], payload?: P): IVxsResponse<D> | unknown => {
    if (!this.options.cache) {
      throw new Error('response is not available on this object')
    }
    const getter = this.findGetter(getters, GET.RESPONSE)
    return getter(payload)
  }

  public dataNamespace = (): string => {
    return this.namespace + SEPARATOR + GET.DATA
  }

  public fetch = (): string => {
    return this.namespace + SEPARATOR + ACTION.FETCH
  }

  public send = (): string => {
    return this.namespace + SEPARATOR + ACTION.SEND
  }

  public invalidate = (): string => {
    return this.namespace + SEPARATOR + ACTION.INVALIDATE
  }

  public invalidateAll = (): string => {
    return this.namespace + SEPARATOR + ACTION.INVALIDATE_ALL
  }

  public forceFetch = (): string => {
    if (!this.options.cache) {
      throw new Error('forceFetch is not available on this object')
    }
    return this.namespace + SEPARATOR + ACTION.FORCE_FETCH
  }

  public reset = (): string => {
    return this.namespace + SEPARATOR + ACTION.RESET
  }

  // tslint:disable-next-line: no-any
  public setState = (payload: any, mockState: any): void => {
    if (mockState === undefined) {
      mockState = payload
      payload = undefined
    }

    if (mockState.data && !mockState.response) {
      mockState = {
        error: false,
        pending: false,
        response: {
          data: mockState.data,
        },
      }
    }

    // if (mockState.data && !mockState.response) {
    //   mockState.response = {
    //     data: mockState.data,
    //   }
    // }

    this.state.ERROR[payloadToKey(payload)] = mockState.error
    this.state.FETCHED[payloadToKey(payload)] = (mockState.response)
    this.state.PENDING[payloadToKey(payload)] = mockState.pending
    this.state.RESPONSE[payloadToKey(payload)] = mockState.response
  }

  public setMethod = (stub: VxsMethod<P, D>): void => {
    this.actions.method = stub
  }

  public setVuexXhrCreator = (vuexXhrCreator: VuexXhrCreator): void => {
    this.vuexXhrCreator = vuexXhrCreator
  }

  /**
   * Invalidate the cache of the group this method belongs to
   */
  public inValidateGroup = (): void => {
    if (!this.vuexXhrCreator) {
      return
    }
    this.vuexXhrCreator.invalidateAll()
  }

  public mockCall(_: unknown, data: D): void {
    const promise = new Promise<IVxsResponse<D>>((resolve): void => {
      resolve({
        data,
      })
    })
    this.setMethod(() => promise)
  }

  private mergeStore = (store: IVxsExtendedStore<D, S, RS>): void => {
    if (store.mutations) {
      Object.assign(this.mutations, store.mutations)
    }
    if (store.actions) {
      Object.assign(this.actions, store.actions)
    }
    if (store.getters) {
      Object.assign(this.getters, store.getters)
    }
  }

  // tslint:disable-next-line:no-any
  private findGetter = (getters: any[], index: string): (_?: P) => any => {
    if (typeof getters[this.namespace + SEPARATOR + index] !== 'undefined') {
      return getters[this.namespace + SEPARATOR + index]
    }

    if (typeof getters[index] !== 'undefined') {
      return getters[index]
    }

    throw new Error('VuexXhr Error. Getter not found (' + index + ')' + this.namespace)
  }
}
