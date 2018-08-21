import { mapGetters } from 'vuex'

export function mapXhrGetters (payload: any, getters?: any) {
  if (typeof getters === 'undefined') {
    getters = payload
    payload = undefined
  }

  const vuexGetters = mapGettersToVuexGetters(getters)
  return mapVuexGettersToXhrGetters(vuexGetters, payload, getters)
}

function mapGettersToVuexGetters (xhrGetters: any) {
  const vueXGetters = {}
  for (const index in xhrGetters) {
    if (xhrGetters.hasOwnProperty(index)) {
      vueXGetters[index] = xhrGetters[index].key
    }
  }
  return mapGetters(vueXGetters)
}

function mapVuexGettersToXhrGetters (vuexGetters: any, payload: any, getters: any) {
  const result = {}
  for (const key in vuexGetters) {
    if (vuexGetters.hasOwnProperty(key)) {
      result[key] = function () {
        vuexGetters[key] = vuexGetters[key].bind(this)
        payload = (getters[key].payload ? getters[key].payload : payload)
        return vuexGetters[key]()(payload)
      }
    }
  }
  return result
}
