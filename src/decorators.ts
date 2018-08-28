// import { iVuexXhr } from './index'
import VuexXhr from './VuexXhr'
import { Action } from 'vuex-class'
import { createDecorator } from 'vue-class-component'
import { ACTION } from './keys'

// Actions
// export function vxsAction (method: string, call: iVuexXhr) {
//   return Action(method, {namespace: call.namespace})
// }

// @ts-ignore
export function vxsActionFetch (call: VuexXhr): any {
  return Action(ACTION.FETCH, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionSend (call: VuexXhr): any {
  return Action(ACTION.SEND, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionForcefetch (call: VuexXhr): any {
  return Action(ACTION.FORCE_FETCH, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionReset (call: VuexXhr): any {
  return Action(ACTION.RESET, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionInvalidate (call: VuexXhr): any {
  return Action(ACTION.INVALIDATE, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionInvalidateAll (call: VuexXhr): any {
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

// @ts-ignore
export function vxsPendingGetter (call: VuexXhr) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.pending(this.$store.getters, payload)
    }
  })
}
// @ts-ignore
export function vxsHasErrorGetter (call: VuexXhr) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.hasError(this.$store.getters, payload)
    }
  })
}
// @ts-ignore
export function vxsFetchedGetter (call: VuexXhr) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.fetched(this.$store.getters, payload)
    }
  })
}
// @ts-ignore
export function vxsResponseGetter (call: VuexXhr) {
  return createDecorator((componentOptions, key) => {
    if (!componentOptions['methods']) {
      componentOptions['methods'] = {}
    }

    componentOptions['methods']![key] = function (payload) {
      return call.response(this.$store.getters, payload)
    }
  })
}
