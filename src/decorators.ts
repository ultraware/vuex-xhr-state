import { createDecorator, VueDecorator } from 'vue-class-component'
import { Action } from 'vuex-class'
import { VuexDecorator } from 'vuex-class/lib/bindings'
import { ACTION } from './keys'
import VuexXhr from './VuexXhr'

// Actions
// export function vxsAction (method: string, call: iVuexXhr) {
//   return Action(method, {namespace: call.namespace})
// }

export function vxsActionFetch<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VuexDecorator {
  return Action(ACTION.FETCH, {namespace: call.namespace})
}

export function vxsActionSend<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VuexDecorator {
  return Action(ACTION.SEND, {namespace: call.namespace})
}

export function vxsActionForcefetch<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VuexDecorator {
  return Action(ACTION.FORCE_FETCH, {namespace: call.namespace})
}

export function vxsActionReset<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VuexDecorator {
  return Action(ACTION.RESET, {namespace: call.namespace})
}

export function vxsActionInvalidate<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VuexDecorator {
  return Action(ACTION.INVALIDATE, {namespace: call.namespace})
}

export function vxsActionInvalidateAll<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VuexDecorator {
  return Action(ACTION.INVALIDATE_ALL, {namespace: call.namespace})
}

// Getters
export function vxsDataGetter<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: P): unknown {
      return call.data(this.$store.getters, payload)
    }
  })
}

export function vxsPendingGetter<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: P): unknown {
      return call.pending(this.$store.getters, payload)
    }
  })
}

export function vxsHasErrorGetter<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: P): unknown {
      return call.hasError(this.$store.getters, payload)
    }
  })
}

export function vxsFetchedGetter<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: P): unknown {
      return call.fetched(this.$store.getters, payload)
    }
  })
}

export function vxsResponseGetter<S, RS, P, D>(call: VuexXhr<S, RS, P, D>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: P): unknown {
      return call.response(this.$store.getters, payload)
    }
  })
}
