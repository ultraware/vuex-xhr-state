import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import VuexXhr from './VuexXhr'

export class VuexXhrPost extends VuexXhr {
  // @todo the pending prop uses the payload so for every put there is a pending in the state
  // @todo function fetch is not correct when we do put
  constructor (options) {
    super()
    this.options = options || {}
    this.namespaced = true
    this.options.cache = false

    this.state = state(this.options)
    this.mutations = mutations(this.options)
    this.actions = actions(false, this.options.method)
    this.getters = getters(false)
    if (this.options.store) {
      this.mergeStore(this.options.store)
    }
  }
}
