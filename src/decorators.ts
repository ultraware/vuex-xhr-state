// import { iVuexXhr } from './index'
import { createDecorator } from 'vue-class-component'
import VuexXhr from './VuexXhr'

// Actions
// export function vxsAction (method: string, call: iVuexXhr) {
//   return Action(method, {namespace: call.namespace})
// }

// @ts-ignore
export function vxsActionFetch (call: VuexXhr): any {
  // @ts-ignore
  return createDecorator((componentOptions: any, key: any) => {
  })
  // return Action('_xhr_fetch', <BindingOptions>{namespace: call.namespace})
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

// export function vxsActionSend (call: iVuexXhr) {
//   return Action(ACTION.SEND, {namespace: call.namespace})
// }
//
// export function vxsActionForcefetch (call: iVuexXhr) {
//   return Action(ACTION.FORCE_FETCH, {namespace: call.namespace})
// }
//
// export function vxsActionReset (call: iVuexXhr) {
//   return Action(ACTION.RESET, {namespace: call.namespace})
// }
//
// export function vxsActionInvalidate (call: iVuexXhr) {
//   return Action(ACTION.INVALIDATE, {namespace: call.namespace})
// }
//
// export function vxsActionInvalidateAll (call: iVuexXhr) {
//   return Action(ACTION.INVALIDATE_ALL, {namespace: call.namespace})
// }
//
// // Getters
// export function vxsDataGetter (call: iVuexXhr) {
//   return createDecorator((componentOptions, key) => {
//     if (!componentOptions['methods']) {
//       componentOptions['methods'] = {}
//     }
//
//     componentOptions['methods']![key] = function (payload) {
//       return call.data(this.$store.getters, payload)
//     }
//   })
// }

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
