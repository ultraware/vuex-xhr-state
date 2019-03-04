import { Plugin, Store } from 'vuex'
import { GLOBAL_GETTERS, GLOBAL_NAMESPACE, globalStore } from './globalXhrState'
import VuexXhr from './VuexXhr'

export class VuexXhrCreator {
  public namespace: string
  public modules: {}
  public store?: Store<unknown>
  private invalidateCreators: VuexXhrCreator[] = []
  // tslint:disable-next-line:no-any
  private invalidateXhr: Array<VuexXhr<any, any, any, any>> = []

  // tslint:disable-next-line:no-any
  constructor(namespace: string, xhrStores: Array<VuexXhr<any, any, any, any>>) {
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

  // tslint:disable-next-line:no-any
  public reset = ($store: Store<any>): void => {
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
      if (
        this.modules.hasOwnProperty(key) &&
        this.modules[key].options.cache &&
        !this.modules[key].options.alwaysRefetch
      ) {
        this.store.dispatch(this.modules[key].invalidateAll())
      }
    }

    for (const creator of this.invalidateCreators) {
      creator.invalidateAll()
    }

    for (const xhr of this.invalidateXhr) {
      this.store.dispatch(xhr.invalidateAll(), { root: true })
    }
  }

  public invalidates = (vxs:
                          VuexXhrCreator | VuexXhrCreator[] |
                          // tslint:disable-next-line:no-any
                          VuexXhr<any, any, any, any> | Array<VuexXhr<any, any, any, any>>,
  ): void => {
    if (vxs instanceof VuexXhrCreator || vxs[0] instanceof VuexXhrCreator) {
      // @ts-ignore
      return this.invalidatesCreator(vxs)
    }

    // @ts-ignore
    this.invalidatesXhr(vxs)
  }

  public invalidatesCreator = (creators: VuexXhrCreator | VuexXhrCreator[]): void => {
    if (!Array.isArray(creators)) {
      creators = [creators]
    }

    this.invalidateCreators = creators
  }

  // tslint:disable-next-line:no-any
  public invalidatesXhr = (xhr: VuexXhr<any, any, any, any> | Array<VuexXhr<any, any, any, any>>): void => {
    if (!Array.isArray(xhr)) {
      xhr = [xhr]
    }

    this.invalidateXhr = xhr
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
