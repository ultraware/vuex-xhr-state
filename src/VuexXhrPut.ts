import VuexXhr from './VuexXhr'
import { VxsOptions } from './types'

export class extendedVuexXhrPut<S, RS, P> extends VuexXhr<S, RS, P, undefined> {
  // @todo the pending prop uses the payload so for every put there is a pending in the state
  // @todo function fetch is not correct when we do put
  constructor (options: VxsOptions<undefined, S, P>) {
    options = options || {}
    options.cache = false
    super(options)
  }
}

export class VuexXhrPut<P> extends extendedVuexXhrPut<object, object, P> {}
