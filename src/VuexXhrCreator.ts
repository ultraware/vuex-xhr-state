import { Plugin, Store } from 'vuex'
import { GLOBAL_GETTERS, GLOBAL_NAMESPACE, globalStore } from './globalXhrState'
import { IVxsModuleState } from './types'
import VuexXhr from './VuexXhr'

export class VuexXhrCreator {
  public namespace: string
  public modules: {}
  public store?: Store<unknown>

  // tslint:disable-next-line:no-any
  constructor(namespace: string, xhrStores: Array<VuexXhr<object, object, any, any>>) {
    this.namespace = namespace
    this.modules = this.xhrStoresToModules(xhrStores)
  }

  public plugin = (): Plugin<unknown> => {
    const self = this
    return (store: Store<unknown>): void => {
      self.store = store
      if (!(GLOBAL_NAMESPACE + '/' + GLOBAL_GETTERS.ANY_PENDING in store.getters)) {
        store.registerModule('globalXhrState', globalStore)
      }
      store.registerModule(self.namespace, {
        namespaced: true,
        modules: self.modules,
      })
    }
  }

  public reset = ($store: Store<IVxsModuleState>): void => {
    for (const prop in this.modules) {
      if (!this.modules.hasOwnProperty(prop)) continue
      $store.dispatch(this.modules[prop].reset())
    }
  }

  public invalidateAll = (): void => {
    if (!this.store) {
      return
    }
    for (const key in this.modules) {
      if (this.modules.hasOwnProperty(key) && this.modules[key].options.cache) {
        this.store.dispatch(this.modules[key].invalidateAll())
      }
    }
  }

  // tslint:disable-next-line:no-any
  public xhrStoresToModules = (xhrStores: Array<VuexXhr<object, object, any, any>>)
    // tslint:disable-next-line:no-any
    : { [_: string]: VuexXhr<object, object, any, any> } => {
    const modules = {}
    xhrStores.forEach((xhrStore, index) => {
      xhrStore.setVuexXhrCreator(this)
      xhrStore.setNamespace(this.namespace + '/xhr' + index)
      modules['xhr' + index] = xhrStore
    })
    return modules
  }
}
