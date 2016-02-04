/* Datastore implementations */
import _ from 'lodash'

/* Helper method for raising errors on stores that do not conform
 * to the interface
 */
function NotImplementedError (storeName, method) {
  return {
    'name': 'NotImplementedError',
    'message': `${method}() not implemented on ${storeName}`
  }
}

/* Interface which defines all the methods that should be available
 * on our stores
 */
export class StoreInterface {
  constructor () { this.name = 'StoreInterface' }

  createEntry (id, entry) {
    throw NotImplementedError(this.name, 'createEntry')
  }
  getEntry (id) {
    throw NotImplementedError(this.name, 'getEntry')
  }
  getEntries () {
    throw NotImplementedError(this.name, 'getEntries')
  }
  removeEntry (id) {
    throw NotImplementedError(this.name, 'removeEntry')
  }
  updateEntry (id, params) {
    throw NotImplementedError(this.name, 'updateEntry')
  }
}

/* In-memory datastore */
export class MemoryStore extends StoreInterface {
  constructor () {
    super()
    this.name = 'MemoryStore'
    this.data = {}
  }

  createEntry (id, newEntry) {
    let entry = this.getEntry(id)
    if (!entry) {
      this.data['entries'][id] = newEntry
      return newEntry
    }
  }

  getEntry (id) {
    let entries = this.getEntries()
    if (entries) { return entries[id] }
  }

  getEntries () {
    return this.data['entries']
  }

  removeEntry (id) {
    let entries = this.getEntries()
    let entry = _.cloneDeep(entries[id])
    if (entry) {
      delete entries[id]
      return entry
    }
  }

  updateEntry (id, params) {
    let entry = this.getEntry(id)
    if (entry) {
      return _.merge(entry, params)
    }
  }
}
