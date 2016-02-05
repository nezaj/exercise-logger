/* Use this module to bootstrap stores with sample data -- useful for dev */
import { UnsupportedStoreError } from '../errors'

export default function bootstrap (store_type, store, seed) {
  if (store_type === 'memory') {
    bootstrapMemory(store, seed)
  } else {
    throw UnsupportedStoreError(store_type)
  }
}

/* Bootstrap MemoryStore instance with seed data */
function bootstrapMemory (store, seed) {
  let data = {'entries': {}}
  for (let e of seed) {
    let id = e.id
    data['entries'][id] = e
  }
  store.data = data
}
