import md5 from 'js-md5'

export function payloadToKey (payload: any) {
  if (payload === undefined) {
    return md5(JSON.stringify('undefined'))
  }
  return md5(JSON.stringify(payload))
}
