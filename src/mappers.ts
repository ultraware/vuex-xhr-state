import { Dictionary, mapGetters } from 'vuex'
import { Computed } from '../node_modules/vuex/types/helpers'

// tslint:disable-next-line: no-any
export function mapXhrGetters(payload: any, getters?: any): object {
  if (typeof getters === 'undefined') {
    getters = payload
    payload = undefined
  }

  const vuexGetters = mapGettersToVuexGetters(getters)
  return mapVuexGettersToXhrGetters(vuexGetters, payload, getters)
}

function mapGettersToVuexGetters(xhrGetters: object): Dictionary<Computed> {
  const vueXGetters = {}
  for (const index in xhrGetters) {
    if (xhrGetters.hasOwnProperty(index)) {
      vueXGetters[index] = xhrGetters[index].key
    }
  }
  return mapGetters(vueXGetters)
}

function mapVuexGettersToXhrGetters(vuexGetters: object, payload: unknown, getters: object): object {
  const result = {}
  for (const key in vuexGetters) {
    if (vuexGetters.hasOwnProperty(key)) {
      result[key] = function(): unknown {
        vuexGetters[key] = vuexGetters[key].bind(this)
        payload = (getters[key].payload ? getters[key].payload : payload)
        return vuexGetters[key]()(payload)
      }
    }
  }
  return result
}
