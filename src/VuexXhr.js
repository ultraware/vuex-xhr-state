import { ACTION, GET, STATE } from './keys'
import { payloadToKey } from './helpers'

const SEPARATOR = '/'

export default class XhrState {
  // constructor () {
  //   if (new.target === XhrState) {
  //     throw new TypeError('Cannot construct XhrState instances directly')
  //   }
  // }

  mergeStore (store) {
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

  setNamespace (namexpace) {
    this.namespace = namexpace
  }

  mapPending (payload) {
    return {key: this.namespace + SEPARATOR + GET.PENDING, payload}
  }

  mapHasError (payload) {
    if (!this.options.cache) {
      throw new Error('mapHasError is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.HAS_ERROR, payload}
  }

  mapFetched (payload) {
    if (!this.options.cache) {
      throw new Error('mapFetched is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.FETCHED, payload}
  }

  mapData (payload) {
    if (!this.options.cache) {
      throw new Error('mapData is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.DATA, payload}
  }

  mapResponse (payload) {
    if (!this.options.cache) {
      throw new Error('mapResponse is not available on this object')
    }
    return {key: this.namespace + SEPARATOR + GET.RESPONSE, payload}
  }

  pending (getters, payload) {
    const getter = this.findGetter(getters, GET.PENDING)
    return getter(payload)
  }

  hasError (getters, payload) {
    if (!this.options.cache) {
      throw new Error('hasError is not available on this object')
    }
    const getter = this.findGetter(getters, GET.HAS_ERROR)
    return getter(payload)
  }

  fetched (getters, payload) {
    if (!this.options.cache) {
      throw new Error('fetched is not available on this object')
    }
    const getter = this.findGetter(getters, GET.FETCHED)
    return getter(payload)
  }

  data (getters, payload) {
    if (!this.options.cache) {
      throw new Error('data is not available on this object')
    }
    const getter = this.findGetter(getters, GET.DATA)
    return getter(payload)
  }

  response (getters, payload) {
    if (!this.options.cache) {
      throw new Error('response is not available on this object')
    }
    const getter = this.findGetter(getters, GET.RESPONSE)
    return getter(payload)
  }

  fetch () {
    return this.namespace + SEPARATOR + ACTION.FETCH
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
  findGetter (getters, index) {
    if (typeof getters[this.namespace + SEPARATOR + index] !== 'undefined') {
      return getters[this.namespace + SEPARATOR + index]
    }

    if (typeof getters[index] !== 'undefined') {
      return getters[index]
    }

    throw new Error('VuexXhr Error. Getter not found (' + index + ')' + this.namespace)
  }

  setState (payload, mockState) {
    if (mockState === undefined) {
      mockState = payload
      payload = undefined
    }

    if (!mockState.data && !mockState.response) {
      mockState = {
        error: false,
        pending: false,
        response: {
          data: mockState.data,
        },
      }
    }

    if (mockState.data && !mockState.response) {
      mockState.response = {
        data: mockState.data,
      }
    }

    this.state[STATE.ERROR][payloadToKey(payload)] = mockState.error
    this.state[STATE.FETCHED][payloadToKey(payload)] = (mockState.response)
    this.state[STATE.PENDING][payloadToKey(payload)] = mockState.pending
    this.state[STATE.RESPONSE][payloadToKey(payload)] = mockState.response
  }

  setMethod (stub) {
    this.actions.method = stub
  }

  mockCall (payload, data) {
    const promise = new Promise(function (resolve, reject) {
      resolve({
        data,
      })
    })
    this.setMethod(() => promise)
  }
}
