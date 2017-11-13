import { STATE } from './keys'

export default (cache, defaultValue) => {
  const result = {
    [ STATE.PENDING ]: {},
  }
  if (cache) {
    result[ STATE.ERROR ] = {}
    result[ STATE.FETCHED ] = {}
    result[ STATE.DEFAULT ] = defaultValue
    result[ STATE.RESPONSE ] = {}
  }
  return result
}
