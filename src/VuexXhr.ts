import { ACTION, GET } from './keys'
import { payloadToKey } from './helpers'
import { VxsActionTree, VxsExtendedState, VxsExtendedStore, VxsMethod, VxsOptions, VxsResponse } from './types'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import { GetterTree, Module, MutationTree } from 'vuex'
import getters from './getters'
import { VuexXhrCreator } from './VuexXhrCreator'

const SEPARATOR = '/'

export default class VuexXhr<S, RS, P, D> implements Module<VxsExtendedState<D, S>, RS> {
  private vuexXhrCreator?: VuexXhrCreator
  public readonly state: VxsExtendedState<D, S>
  public readonly namespaced: boolean
  public namespace: string = ''
  mutations: MutationTree<VxsExtendedState<D, S>>
  actions: VxsActionTree<S, RS, P, D>
  getters: GetterTree<VxsExtendedState<D, S>, RS>
  options: VxsOptions<D, S, P>

  constructor (options: VxsOptions<D, S, P>) {
    this.namespaced = true
    this.options = options
    this.state = state<D, S, P>(this.options)
    this.mutations = mutations<D, S>(this.options)
    this.actions = actions<S, RS, P, D>(this.options.cache ? this.options.cache : true, this.options.method, this.inValidateGroup)
    this.getters = getters<RS, D, P>(this.options.cache ? this.options.cache : true)

    if (this.options.store) {
      this.mergeStore(this.options.store)
    }
  }

  mergeStore (store: VxsExtendedStore<D, S, RS>): void {
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

  setNamespace (namespace: string): void {
    this.namespace = namespace
  }

  mapPending (payload: P) {
    return {key: this.namespace + SEPARATOR + GET.PENDING, payload}
  }

  mapHasError (payload: P) {
    if (!this.options.cache) {
      throw new Error('mapHasError is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.HAS_ERROR, payload}
  }

  mapFetched (payload: P) {
    if (!this.options.cache) {
      throw new Error('mapFetched is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.FETCHED, payload}
  }

  mapData (payload: P) {
    if (!this.options.cache) {
      throw new Error('mapData is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.DATA, payload}
  }

  mapResponse (payload: P) {
    if (!this.options.cache) {
      throw new Error('mapResponse is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.RESPONSE, payload}
  }

  pending (getters: any, payload: P) {
    const getter = this.findGetter(getters, GET.PENDING)
    return getter(payload)
  }

  hasError (getters: any, payload?: P) {
    if (!this.options.cache) {
      throw new Error('hasError is not available on this object')
    }
    const getter = this.findGetter(getters, GET.HAS_ERROR)
    return getter(payload)
  }

  fetched (getters: any, payload?: P) {
    if (!this.options.cache) {
      throw new Error('fetched is not available on this object')
    }
    const getter = this.findGetter(getters, GET.FETCHED)
    return getter(payload)
  }

  data (getters: any, payload?: P): D {
    if (!this.options.cache) {
      throw new Error('data is not available on this object')
    }
    const getter = this.findGetter(getters, GET.DATA)
    return getter(payload)
  }

  response (getters: any, payload?: P): VxsResponse<D> {
    if (!this.options.cache) {
      throw new Error('response is not available on this object')
    }
    const getter = this.findGetter(getters, GET.RESPONSE)
    return getter(payload)
  }

  dataNamespace () {
    return this.namespace + SEPARATOR + GET.DATA
  }

  fetch () {
    return this.namespace + SEPARATOR + ACTION.FETCH
  }

  send () {
    return this.namespace + SEPARATOR + ACTION.SEND
  }

  invalidate () {
    return this.namespace + SEPARATOR + ACTION.INVALIDATE
  }

  invalidateAll () {
    return this.namespace + SEPARATOR + ACTION.INVALIDATE_ALL
  }

  forceFetch () {
    if (!this.options.cache) {
      throw new Error('forceFetch is not available on this object')
    }
    return this.namespace + SEPARATOR + ACTION.FORCE_FETCH
  }

  reset () {
    return this.namespace + SEPARATOR + ACTION.RESET
  }

  /** @private */
  findGetter (getters: any, index: string) {
    if (typeof getters[this.namespace + SEPARATOR + index] !== 'undefined') {
      return getters[this.namespace + SEPARATOR + index]
    }

    if (typeof getters[index] !== 'undefined') {
      return getters[index]
    }

    throw new Error('VuexXhr Error. Getter not found (' + index + ')' + this.namespace)
  }

  setState (payload: any, mockState: any) {
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

    this.state['ERROR'][payloadToKey(payload)] = mockState.error
    this.state['FETCHED'][payloadToKey(payload)] = (mockState.response)
    this.state['PENDING'][payloadToKey(payload)] = mockState.pending
    this.state['RESPONSE'][payloadToKey(payload)] = mockState.response
  }

  setMethod (stub: VxsMethod<P, D>) {
    this.actions.method = stub
  }

  setVuexXhrCreator (vuexXhrCreator: VuexXhrCreator) {
    this.vuexXhrCreator = vuexXhrCreator
  }

  /**
   * Invalidate the cache of the group this method belongs to
   */
  inValidateGroup () {
    if (!this.vuexXhrCreator) {
      return
    }
    this.vuexXhrCreator.invalidateAll()
  }

  mockCall (_payload: any, data: D) {
    const promise = new Promise<VxsResponse<D>>(function (resolve) {
      resolve({
        data,
      })
    })
    this.setMethod(() => promise)
  }
}
