import { IVxsOptions } from './types'
import VuexXhr from './VuexXhr'

export class VuexXhrPut<P, S = object, RS = object, D = undefined> extends VuexXhr<S, RS, P, D> {
  // @todo the pending prop uses the payload so for every put there is a pending in the state
  // @todo function fetch is not correct when we do put
  constructor(options: IVxsOptions<D, P, S >) {
    options = options || {}
    options.cache = false
    super(options)
  }
}
