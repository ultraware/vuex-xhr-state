import { STATE } from './keys'

export default (options) => {
  const result = {
    [ STATE.PENDING ]: {},
  }
  if (options.cache) {
    result[STATE.ERROR] = {}
    result[STATE.FETCHED] = {}
    result[STATE.DEFAULT] = options.default
    result[STATE.RESPONSE] = {}
  }
  if (options.store && options.store.state) {
    for (let key in options.store.state) {
      result[key] = options.store.state[key]
    }
  }
  return result
}
