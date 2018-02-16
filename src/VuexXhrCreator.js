import { GLOBAL_GETTERS, GLOBAL_NAMESPACE, globalState } from './globalXhrState'

export class VuexXhrCreator {
  constructor (namespace, xhrStores) {
    this.namespace = namespace
    this.modules = this.xhrStoresToModules(xhrStores)
    this.store = {}
  }

  plugin () {
    const self = this
    return function (store) {
      if (!(GLOBAL_NAMESPACE + '/' + GLOBAL_GETTERS.ANY_PENDING in store.getters)) {
        store.registerModule('globalXhrState', globalState)
      }
      store.registerModule(self.namespace, {
        namespaced: true,
        modules: self.modules,
      })
    }
  }

  reset ($store) {
    for (const prop in this.modules) {
      if (!this.modules.hasOwnProperty(prop)) continue
      $store.dispatch(this.modules[prop].reset())
    }
  }

  xhrStoresToModules (xhrStores) {
    const modules = {}
    xhrStores.forEach((xhrStore, index) => {
      xhrStore.setNamespace(this.namespace + '/xhr' + index)
      modules['xhr' + index] = xhrStore
    })
    return modules
  }
}
