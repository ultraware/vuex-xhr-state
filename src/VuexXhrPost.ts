import { IVxsOptions } from './types'
import VuexXhr from './VuexXhr'

export class VuexXhrPost<P, S = object, RS = object> extends VuexXhr<S, RS, P, undefined> {
  // @todo the pending prop uses the payload so for every put there is a pending in the state
  // @todo function fetch is not correct when we do put
  constructor(options: IVxsOptions<undefined, P, S>) {
    options = options || {}
    options.cache = false
    super(options)
  }
}
