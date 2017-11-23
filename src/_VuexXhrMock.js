import state from './state'
import VuexXhr from './VuexXhr'
import { mockMutation } from './mutations'
import actions from './actions'
import getters from './getters'


export default class VuexXhrMock extends VuexXhr {
  constructor (options) {
    options = options || {}
    super()
    this.namespaced = true
    this.cache = true

    this.state = state(this.cache, options.default)
    this.mutations = mockMutation()
    this.actions = actions(this.cache, options.method)
    this.getters = getters(this.cache)
    if (options.store) {
      this.mergeStore(options.store)
    }
  }


}
