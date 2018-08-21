import VuexXhr from './VuexXhr'
import { VxsOptions } from './types'

export class VuexXhrPut<S, RS, P, D> extends VuexXhr<S, RS, P, D> {
  // @todo the pending prop uses the payload so for every put there is a pending in the state
  // @todo function fetch is not correct when we do put
  constructor (options: VxsOptions<D, S, P>) {
    options = options || {}
    options.cache = false
    super(options)
  }
}
