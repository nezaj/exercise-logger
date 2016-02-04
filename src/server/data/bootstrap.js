/* Use this module to bootstrap stores with sample data -- useful for dev */

/* Bootstrap MemoryStore instance with seed data */
export function bootstrapMemory (store, seed) {
  let data = {'entries': {}}
  for (let e of seed) {
    let id = e.id
    data['entries'][id] = e
  }
  store.data = data
}
