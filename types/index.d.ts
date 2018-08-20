import VuexXhr from '../src/VuexXhr'
import { VuexXhrCreator } from '../src/VuexXhrCreator'

export * from './decorators'

export declare class VuexXhrCreator {

  constructor (namespace: string, xhrStores: Array<VuexXhr>);

  // subscribe (fn: (void): () => void;

  //
  // readonly state: S;
  // readonly getters: any;
  //
  // replaceState(state: S): void;
  //
  // dispatch: Dispatch;
  // commit: Commit;
  //
  // subscribe<P extends MutationPayload>(fn: (mutation: P, state: S) => any): () => void;
  // subscribeAction<P extends ActionPayload>(fn: (action: P, state: S) => any): () => void;
  // watch<T>(getter: (state: S, getters: any) => T, cb: (value: T, oldValue: T) => void, options?: WatchOptions): () => void;
  //
  // registerModule<T>(path: string, module: Module<T, S>, options?: ModuleOptions): void;
  // registerModule<T>(path: string[], module: Module<T, S>, options?: ModuleOptions): void;
  //
  // unregisterModule(path: string): void;
  // unregisterModule(path: string[]): void;
  //
  // hotUpdate(options: {
  //   actions?: ActionTree<S, S>;
  //   mutations?: MutationTree<S>;
  //   getters?: GetterTree<S, S>;
  //   modules?: ModuleTree<S>;
  // }): void;
}
