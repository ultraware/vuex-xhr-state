import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import VuexXhr from './VuexXhr'

export default class VuexXhrPut extends VuexXhr {
  // @todo the pending prop uses the payload so for every put there is a pending in the state
  // @todo function fetch is not correct when we do put
  constructor (options) {
    super()
    this.namespaced = true
    this.cache = false

    this.state = state(false)
    this.mutations = mutations(false)
    this.actions = actions(false, options.method)
    this.getters = getters(false)
    if (options.store) {
      this.mergeStore(options.store)
    }
  }
}
