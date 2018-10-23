import { createDecorator, VueDecorator } from 'vue-class-component'
import { Action } from 'vuex-class'
import { ACTION } from './keys'
import VuexXhr from './VuexXhr'

// Actions
// export function vxsAction (method: string, call: iVuexXhr) {
//   return Action(method, {namespace: call.namespace})
// }

export function vxsActionFetch(call: VuexXhr<unknown, unknown, unknown, unknown>): unknown {
  return Action(ACTION.FETCH, {namespace: call.namespace})
}

export function vxsActionSend(call: VuexXhr<unknown, unknown, unknown, unknown>): unknown {
  return Action(ACTION.SEND, {namespace: call.namespace})
}

export function vxsActionForcefetch(call: VuexXhr<unknown, unknown, unknown, unknown>): unknown {
  return Action(ACTION.FORCE_FETCH, {namespace: call.namespace})
}

export function vxsActionReset(call: VuexXhr<unknown, unknown, unknown, unknown>): unknown {
  return Action(ACTION.RESET, {namespace: call.namespace})
}

export function vxsActionInvalidate(call: VuexXhr<unknown, unknown, unknown, unknown>): unknown {
  return Action(ACTION.INVALIDATE, {namespace: call.namespace})
}

export function vxsActionInvalidateAll(call: VuexXhr<unknown, unknown, unknown, unknown>): unknown {
  return Action(ACTION.INVALIDATE_ALL, {namespace: call.namespace})
}

// Getters
export function vxsDataGetter(call: VuexXhr<unknown, unknown, unknown, unknown>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: unknown): unknown {
      return call.data(this.$store.getters, payload)
    }
  })
}

export function vxsPendingGetter(call: VuexXhr<unknown, unknown, unknown, unknown>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: unknown): unknown {
      return call.pending(this.$store.getters, payload)
    }
  })
}

export function vxsHasErrorGetter(call: VuexXhr<unknown, unknown, unknown, unknown>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: unknown): unknown {
      return call.hasError(this.$store.getters, payload)
    }
  })
}

export function vxsFetchedGetter(call: VuexXhr<unknown, unknown, unknown, unknown>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: unknown): unknown {
      return call.fetched(this.$store.getters, payload)
    }
  })
}

export function vxsResponseGetter(call: VuexXhr<unknown, unknown, unknown, unknown>): VueDecorator {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions.methods) {
      componentOptions.methods = {}
    }

    componentOptions.methods![key] = function(payload: unknown): unknown {
      return call.response(this.$store.getters, payload)
    }
  })
}
