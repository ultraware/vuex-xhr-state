import _Vue, { PluginObject } from 'vue'
import { GLOBAL_ACTIONS, GLOBAL_GETTERS, GLOBAL_NAMESPACE } from './globalXhrState'

export * from './decorators'
export { mapXhrGetters } from './mappers'
export { VuexXhrCreator } from './VuexXhrCreator'
export { VuexXhrGet } from './VuexXhrGet'
export { VuexXhrPut } from './VuexXhrPut'
export { VuexXhrPost } from './VuexXhrPost'

// tslint:disable:only-arrow-function
export default <PluginObject<unknown>>  {
  install(Vue: typeof _Vue): void {
    Vue.prototype.$anyXhrPending = function(): unknown {
      return this.$store.getters[`${GLOBAL_NAMESPACE}/${GLOBAL_GETTERS.ANY_PENDING}`]
    }
    Vue.prototype.$anyXhrError = function(): unknown {
      return this.$store.getters[`${GLOBAL_NAMESPACE}/${GLOBAL_GETTERS.ANY_ERROR}`]
    }
    Vue.prototype.$lastXhrErrorResponse = function(): unknown {
      return this.$store.getters[`${GLOBAL_NAMESPACE}/${GLOBAL_GETTERS.LAST_ERROR_RESPONSE}`]
    }

    Vue.prototype.$resetXhrErrors = function(): void {
      return this.$store.commit(`${GLOBAL_NAMESPACE}/${GLOBAL_ACTIONS.RESET_ERROR}`)
    }
  },
}
