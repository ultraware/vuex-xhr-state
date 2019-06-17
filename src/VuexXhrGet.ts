import { IVxsOptions } from './types'
import VuexXhr from './VuexXhr'

export class VuexXhrGet<D, P, S = object, RS = object> extends VuexXhr<S, RS, P, D> {
  // @todo getters state enz in this file?
  constructor(options: IVxsOptions<D, P, S, RS>) {
    options = options || {}
    options.cache = (typeof options.cache === 'undefined' ? true : options.cache)
    super(options)
  }
}
