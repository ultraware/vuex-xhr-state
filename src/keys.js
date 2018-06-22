const PENDING = '_xhr_pending'
const ERROR = '_xhr_error'
const HAS_ERROR = '_xhr_has_error'
const FETCHED = '_xhr_fetched'
const DATA = '_xhr_data'
const RESPONSE = '_xhr_response'
const PAYLOAD_KEYS = '_xhr_payload_keys'
const SEND = '_xhr_send'
const FETCH = '_xhr_fetch'
const FORCE_FETCH = '_xhr_forceFetch'
const DEFAULT = '_xhr_default'
const REQUEST = '_xhr_request'
const RECEIVED = '_xhr_received'
const FAILED = '_xhr_failed'
const RESET = '_xhr_reset'
const INVALIDATE = '_xhr_invalidate'
const INVALIDATE_ALL = '_xhr_invalidate_all'

export const STATE = {
  PENDING: 'state_' + PENDING,
  ERROR: 'state_' + ERROR,
  FETCHED: 'state_' + FETCHED,
  DEFAULT: 'state_' + DEFAULT,
  RESPONSE: 'state_' + RESPONSE,
}

export const MUTATIONS = {
  REQUEST,
  RECEIVED,
  FAILED,
  RESET,
  INVALIDATE,
}

export const GET = {
  PENDING,
  HAS_ERROR,
  FETCHED,
  DATA,
  RESPONSE,
  PAYLOAD_KEYS,
}
export const ACTION = {
  SEND,
  FETCH,
  FORCE_FETCH,
  RESET,
  INVALIDATE,
  INVALIDATE_ALL,
}
