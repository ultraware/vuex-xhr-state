import VuexXhr from './VuexXhr'
import { VxsOptions } from './types'

export class extendedVuexXhrGet<S, RS, P, D> extends VuexXhr<S, RS, P, D> {
  // @todo getters state enz in this file?
  constructor (options: VxsOptions<D, S, P>) {
    options = options || {}
    options.cache = (typeof options.cache === 'undefined' ? true : options.cache)
    super(options)

    if (this.options.store) {
      this.mergeStore(this.options.store)
    }
  }
}

export class VuexXhrGet<P, D> extends extendedVuexXhrGet<object, object, P, D> {}
