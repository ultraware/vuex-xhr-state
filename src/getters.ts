import { GetterTree } from 'vuex'
import { payloadToKey } from './helpers'
import { GET } from './keys'
import { IVxsResponse, IVxsState } from './types'

export default <D, P, RS>(cache: boolean): GetterTree<IVxsState<D>, RS> => {
  const result = <GetterTree<IVxsState<D>, RS>> {
    [GET.PENDING]: (state: IVxsState<D>): unknown => (payload: P): boolean => {
      return state.PENDING[payloadToKey(payload)]
    },
  }

  if (cache) {
    result[GET.HAS_ERROR] = (state: IVxsState<D>): unknown => (payload: P): boolean => {
      return state.ERROR[payloadToKey(payload)]
    }
    result[GET.FETCHED] = (state: IVxsState<D>): unknown => (payload: P): boolean => {
      return state.FETCHED[payloadToKey(payload)]
    }
    result[GET.DATA] = (state: IVxsState<D>): unknown => (payload: P): D | undefined => {
      const key = payloadToKey(payload)
      if (state.RESPONSE[key] && !state.ERROR[key]) {
        // @todo split response en error response in different state variable
        // @ts-ignore
        return state.RESPONSE[key].data
      }
      return state.DEFAULT
    }
    result[GET.RESPONSE] = (state: IVxsState<D>): unknown =>
      (payload: P): IVxsResponse<D> => state.RESPONSE[payloadToKey(payload)]

    result[GET.PAYLOAD_KEYS] = (state: IVxsState<D>): unknown => (): string[] => Object.keys(state.RESPONSE)
  }
  return result
}
