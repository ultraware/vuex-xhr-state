import md5 from 'js-md5'

export function payloadToKey (params) {
  if (params === undefined) {
    params = 'undefined'
  }
  return md5(JSON.stringify(params))
}
