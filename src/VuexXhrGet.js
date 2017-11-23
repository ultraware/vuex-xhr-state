import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import VuexXhr from './VuexXhr'

export class VuexXhrGet extends VuexXhr {
  // @todo implement cache
  // @todo getters state enz in this file?
  constructor (options) {
    options = options || {}
    super()
    this.namespaced = true
    this.cache = (options.cache === undefined ? true : options.cache)

    this.state = state(this.cache, options.default)
    this.mutations = mutations(this.cache)
    this.actions = actions(this.cache, options.method)
    this.getters = getters(this.cache)
    if (options.store) {
      this.mergeStore(options.store)
    }
  }
}
