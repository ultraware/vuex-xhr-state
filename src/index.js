import { GLOBAL_ACTIONS, GLOBAL_GETTERS, GLOBAL_NAMESPACE } from './globalXhrState'

export * from './mappers'
export * from './VuexXhrCreator'
export * from './VuexXhrGet'
export * from './VuexXhrPut'

export default {
  install: function (Vue) {
    Vue.prototype.$anyXhrPending = function () {
      return this.$store.getters[`${GLOBAL_NAMESPACE}/${GLOBAL_GETTERS.ANY_PENDING}`]
    }
    Vue.prototype.$anyXhrError = function () {
      return this.$store.getters[`${GLOBAL_NAMESPACE}/${GLOBAL_GETTERS.ANY_ERROR}`]
    }
    Vue.prototype.$lastXhrErrorResponse = function () {
      return this.$store.getters[`${GLOBAL_NAMESPACE}/${GLOBAL_GETTERS.LAST_ERROR_RESPONSE}`]
    }

    Vue.prototype.$resetXhrErrors = function () {
      return this.$store.commit(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.RESET_ERROR}`)
    }
  },
}
// export function mapXhrStateModules (xhrStates) {
//   return xhrStates.reduce(function (result, xhrState) {
//     return xhrState.storeModule(result)
//   }, {})
// }

// @ todo make some tests
