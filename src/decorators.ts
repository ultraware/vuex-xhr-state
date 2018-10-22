// import { iVuexXhr } from './index'
import VuexXhr from './VuexXhr'
import { Action } from 'vuex-class'
import { createDecorator } from 'vue-class-component'
import { ACTION } from './keys'

// Actions
// export function vxsAction (method: string, call: iVuexXhr) {
//   return Action(method, {namespace: call.namespace})
// }

export function vxsActionFetch (call: VuexXhr<any, any, any, any>): any {
  return Action(ACTION.FETCH, {namespace: call.namespace})
}

export function vxsActionSend (call: VuexXhr<any, any, any, any>): any {
  return Action(ACTION.SEND, {namespace: call.namespace})
}

export function vxsActionForcefetch (call: VuexXhr<any, any, any, any>): any {
  return Action(ACTION.FORCE_FETCH, {namespace: call.namespace})
}

export function vxsActionReset (call: VuexXhr<any, any, any, any>): any {
  return Action(ACTION.RESET, {namespace: call.namespace})
}

export function vxsActionInvalidate (call: VuexXhr<any, any, any, any>): any {
  return Action(ACTION.INVALIDATE, {namespace: call.namespace})
}

export function vxsActionInvalidateAll (call: VuexXhr<any, any, any, any>): any {
  return Action(ACTION.INVALIDATE_ALL, {namespace: call.namespace})
}

// Getters
export function vxsDataGetter (call: VuexXhr<any, any, any, any>) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.data(this.$store.getters, payload)
    }
  })
}

export function vxsPendingGetter (call: VuexXhr<any, any, any, any>) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.pending(this.$store.getters, payload)
    }
  })
}

export function vxsHasErrorGetter (call: VuexXhr<any, any, any, any>) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.hasError(this.$store.getters, payload)
    }
  })
}

export function vxsFetchedGetter (call: VuexXhr<any, any, any, any>) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.fetched(this.$store.getters, payload)
    }
  })
}

export function vxsResponseGetter (call: VuexXhr<any, any, any, any>) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.response(this.$store.getters, payload)
    }
  })
}
