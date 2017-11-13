export default class VuexXhrCreator {
  constructor (namespace, xhrStores) {
    this.namespace = namespace
    this.xhrStores = xhrStores
    this.store = {}
  }

  plugin () {
    const self = this
    return function (store) {
      store.registerModule(self.namespace, {
        namespaced: true,
        modules: self.getdXhrStoreModules(),
      })
    }
  }

  /** @private */
  // mergeStores (store, ...merge) {
  // const store = this.emptyStore()
  // merge.forEach((mergeStore) => {
  //   if (typeof mergeStore.setNamespace === 'function') {
  //     mergeStore.setNamespace(this.namespace)
  //   }
  //   if (mergeStore.state) {
  //     Object.assign(store.state, mergeStore.state)
  //   }
  //   if (mergeStore.mutations) {
  //     Object.assign(store.mutations, mergeStore.mutations)
  //   }
  //   if (mergeStore.actions) {
  //     Object.assign(store.actions, mergeStore.actions)
  //   }
  //   if (mergeStore.getters) {
  //     Object.assign(store.getters, mergeStore.getters)
  //   }
  // })
  // return store
  // }

  // /** @private */
  // complementStore (store) {
  //   if (!store) {
  //     return this.emptyStore()
  //   }
  //
  //   store.namespaced = true
  //
  //   if (typeof store.state === 'undefined') {
  //     store.state = {}
  //   }
  //   if (typeof store.mutations === 'undefined') {
  //     store.mutations = {}
  //   }
  //   if (typeof store.actions === 'undefined') {
  //     store.actions = {}
  //   }
  //   if (typeof store.getters === 'undefined') {
  //     store.getters = {}
  //   }
  //   return store
  // }

  /** @private */
  emptyStore () {
    return {
      namespaced: true,
      state: {},
      mutations: {},
      actions: {},
      getters: {},
    }
  }

  getdXhrStoreModules () {
    const result = {}
    this.xhrStores.forEach((xhrStore, index) => {
      xhrStore.setNamespace(this.namespace + '/xhr' + index)
      result[ 'xhr' + index ] = xhrStore
    })
    return result
  }
}
