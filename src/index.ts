import { GLOBAL_ACTIONS, GLOBAL_GETTERS, GLOBAL_NAMESPACE } from './globalXhrState'
import _Vue from 'vue'

export { mapXhrGetters } from './mappers'
export { VuexXhrCreator } from './VuexXhrCreator'
export { VuexXhrGet } from './VuexXhrGet'
export { VuexXhrPut } from './VuexXhrPut'
export { VuexXhrPost } from './VuexXhrPost'
export * from './decorators'

export default {
  install: function (Vue: typeof _Vue) {
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
