import { GET } from './keys'
import { payloadToKey } from './helpers'
import { GetterTree } from 'vuex'
import { VxsState } from './types'

export default <S, RS, P> (cache: boolean): GetterTree<VxsState<S>, RS> => {
  const result = <GetterTree<VxsState<S>, RS>>{
    [GET.PENDING]: (state: VxsState<S>) => (payload: P) => {
      return state['PENDING'][payloadToKey(payload)]
    },
  }

  if (cache) {
    result[GET.HAS_ERROR] = (state: VxsState<S>) => (payload: P) => {
      return state['ERROR'][payloadToKey(payload)]
    }
    result[GET.FETCHED] = (state: VxsState<S>) => (payload: P) => {
      return state['FETCHED'][payloadToKey(payload)]
    }
    result[GET.DATA] = (state: VxsState<S>) => (payload: P) => {
      const key = payloadToKey(payload)
      if (state['RESPONSE'][key] && !state['ERROR'][key]) {
        // @todo split response en error response in different state variable
        // @ts-ignore
        return state['RESPONSE'][key].data
      }
      return state['DEFAULT']
    }
    result[GET.RESPONSE] = (state: VxsState<S>) => (payload: P) => state['RESPONSE'][payloadToKey(payload)]

    result[GET.PAYLOAD_KEYS] = (state: VxsState<S>) => () => Object.keys(state['RESPONSE'])
  }
  return result
}
