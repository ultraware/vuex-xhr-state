import { GLOBAL_GETTERS, GLOBAL_NAMESPACE, globalStore } from './globalXhrState'
import VuexXhr from './VuexXhr'
import { Store } from 'vuex'

export class VuexXhrCreator<S, RS, P, D> {
  public namespace: string
  public modules: {}
  public store?: Store<S>

  constructor (namespace: string, xhrStores: Array<VuexXhr<S, RS, P, D>>) {
    this.namespace = namespace
    this.modules = this.xhrStoresToModules(xhrStores)
  }

  plugin () {
    const self = this
    return function (store: Store<S>) {
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

  reset ($store: Store<S>) {
    for (const prop in this.modules) {
      if (!this.modules.hasOwnProperty(prop)) continue
      $store.dispatch(this.modules[prop].reset())
    }
  }

  invalidateAll () {
    if (!this.store) {
      return
    }
    for (const key in this.modules) {
      if (this.modules.hasOwnProperty(key) && this.modules[key].options.cache) {
        this.store.dispatch(this.modules[key].invalidateAll())
      }
    }
  }

  xhrStoresToModules (xhrStores: Array<VuexXhr<S, RS, P, D>>) {
    const modules = {}
    xhrStores.forEach((xhrStore, index) => {
      xhrStore.setVuexXhrCreator(this)
      xhrStore.setNamespace(this.namespace + '/xhr' + index)
      modules['xhr' + index] = xhrStore
    })
    return modules
  }
}
