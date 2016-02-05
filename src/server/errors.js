/* Raised by operations that interact with stores based on store_type */
export function UnsupportedStoreError (store_type) {
  return {
    'name': 'UnsupportedStoreError',
    'message': `${store_type} is not supported`
  }
}
