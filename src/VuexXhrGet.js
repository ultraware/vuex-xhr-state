import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import VuexXhr from './VuexXhr'

export class VuexXhrGet extends VuexXhr {
  // @todo getters state enz in this file?
  constructor (options) {
    super()
    this.options = options || {}
    this.namespaced = true
    this.options.cache = (typeof this.options.cache === 'undefined' ? true : this.options.cache)

    this.state = state(this.options)
    this.mutations = mutations(this.options)
    this.actions = actions(this.options.cache, this.options.method, this)
    this.getters = getters(this.options.cache)
    if (this.options.store) {
      this.mergeStore(this.options.store)
    }
  }
}
