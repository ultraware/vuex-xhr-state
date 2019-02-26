import md5 from 'js-md5'
import { IVxsPayload } from './types'

export function payloadToKey(payload: unknown): string {
  if (payload === undefined) {
    return md5(JSON.stringify('undefined'))
  }

  if (typeof payload === 'object') {
    const keys = Object.keys(<IVxsPayload>payload)

    if (keys.includes('errorHandler')) {
      if (keys.length === 1) {
        return md5(JSON.stringify('undefined'))
      }

      payload = JSON.parse(JSON.stringify(payload))
      delete (<IVxsPayload> payload).errorHandler
    }
  }

  return md5(JSON.stringify(payload))
}
