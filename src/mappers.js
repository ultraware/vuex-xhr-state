import { mapGetters } from 'vuex'

export function mapXhrGetters (payload, getters) {
  if (typeof getters === 'undefined') {
    getters = payload
    payload = undefined
  }

  const vuexGetters = mapGettersToVuexGetters(getters)
  return mapVuexGettersToXhrGetters(vuexGetters, payload, getters)
}

function mapGettersToVuexGetters (xhrGetters) {
  const vueXGetters = {}
  for (const index in xhrGetters) {
    if (xhrGetters.hasOwnProperty(index)) {
      vueXGetters[ index ] = xhrGetters[ index ].key
    }
  }
  return mapGetters(vueXGetters)
}

function mapVuexGettersToXhrGetters (vuexGetters, payload, getters) {
  const result = {}
  for (const key in vuexGetters) {
    if (vuexGetters.hasOwnProperty(key)) {
      result[ key ] = function () {
        vuexGetters[ key ] = vuexGetters[ key ].bind(this)
        payload = (getters[ key ].payload ? getters[ key ].payload : payload)
        return vuexGetters[ key ]()(payload)
      }
    }
  }
  return result
}

