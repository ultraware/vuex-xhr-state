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

// export function temp (param, param2) {
//   function makeDecorator () {
//     return createDecorator((componentOptions, key) => {
//       if (!componentOptions['methods']) {
//         componentOptions['methods'] = {}
//       }
//
//       // const mapObject = {[key]: map}
//
//       componentOptions['methods']![key] = () => console.log('a0', this, param, param2)
//       // componentOptions['methods']![key] = namespace !== undefined
//       //   ? mapFn(namespace, mapObject)[key]
//       //   : mapFn(mapObject)[key]
//     })
//   }
//
//   function helper () {
//     makeDecorator()
//   }
//
//   console.log('dslkfjls;dhfjlksdhflk')
//   return helper
// }

// @ts-ignore
export function vxsActionSend (call: VuexXhr) {
  return Action(ACTION.SEND, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionForcefetch (call: VuexXhr) {
  return Action(ACTION.FORCE_FETCH, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionReset (call: VuexXhr) {
  return Action(ACTION.RESET, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionInvalidate (call: VuexXhr) {
  return Action(ACTION.INVALIDATE, {namespace: call.namespace})
}

// @ts-ignore
export function vxsActionInvalidateAll (call: VuexXhr) {
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

// export function vxsPendingGetter (call: iVuexXhr) {
//   return createDecorator((componentOptions, key) => {
//     if (!componentOptions['methods']) {
//       componentOptions['methods'] = {}
//     }
//
//     componentOptions['methods']![key] = function (payload) {
//       return call.pending(this.$store.getters, payload)
//     }
//   })
// }
//
// export function vxsHasErrorGetter (call: iVuexXhr) {
//   return createDecorator((componentOptions, key) => {
//     if (!componentOptions['methods']) {
//       componentOptions['methods'] = {}
//     }
//
//     componentOptions['methods']![key] = function (payload) {
//       return call.hasError(this.$store.getters, payload)
//     }
//   })
// }
//
// export function vxsFetchedGetter (call: iVuexXhr) {
//   return createDecorator((componentOptions, key) => {
//     if (!componentOptions['methods']) {
//       componentOptions['methods'] = {}
//     }
//
//     componentOptions['methods']![key] = function (payload) {
//       return call.fetched(this.$store.getters, payload)
//     }
//   })
// }
//
// export function vxsResponseGetter (call: iVuexXhr) {
//   return createDecorator((componentOptions, key) => {
//     if (!componentOptions['methods']) {
//       componentOptions['methods'] = {}
//     }
//
//     componentOptions['methods']![key] = function (payload) {
//       return call.response(this.$store.getters, payload)
//     }
//   })
// }
