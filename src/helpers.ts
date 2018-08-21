import md5 from 'js-md5'

export function payloadToKey<P> (payload: P) {
  if (payload === undefined) {
    return md5(JSON.stringify('undefined'))
  }
  return md5(JSON.stringify(payload))
}
