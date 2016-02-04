/* Test store methods */
import assert from 'assert'

import _ from 'lodash'
import uuid from 'node-uuid'

import { MemoryStore } from '../../../src/server/data/store'

const MOCK_ENTRY_ID = 'moop'
const MOCK_ENTRY = {
  'id': MOCK_ENTRY_ID,
  'date': '(Sunday): 01/24/16',
  'foods': [
    { 'id': uuid.v4(), 'value': 'Breaded Chicken (330) + BBQ Chicken (175)' },
    { 'id': uuid.v4(), 'value': 'Veggies (75)' },
    { 'id': uuid.v4(), 'value': 'Protein Ice Cream (70)' },
    { 'id': uuid.v4(), 'value': 'Mandarins (70) + Avocado (275)' },
    { 'id': uuid.v4(), 'value': 'Cottage Cheese (180) + Carrots (50)' },
    { 'id': uuid.v4(), 'value': 'BBQ Chicken (175) + Chicken Tenders (330)' },
    { 'id': uuid.v4(), 'value': 'Protein Ice Cream (140)' }
  ]
}
const MOCK_ENTRIES = {[MOCK_ENTRY_ID]: MOCK_ENTRY}
const MOCK_DATA = {'entries': MOCK_ENTRIES}

const UPDATE_ENTRY_DATE = { 'date': '(Monday): 01/25/16' }
const UPDATED_ENTRY = _.merge(_.cloneDeep(MOCK_ENTRY), UPDATE_ENTRY_DATE)

/* Helper method to truncate MemoryStore data */
let truncateMemory = (store) => {
  store.data['entries'] = {}
}

describe('MemoryStore', () => {
  let store

  beforeEach(() => {
    store = new MemoryStore()
    store.data = _.cloneDeep(MOCK_DATA)
  })

  context('#getEntries', () => {
    it('#getEntries returns all the entries', () => {
      assert.deepEqual(store.getEntries(), MOCK_ENTRIES)
    })
    it('returns empty object if there are no entries', () => {
      truncateMemory(store)
      let isEmpty = _.isEmpty(store.getEntries())
      assert.ok(isEmpty)
    })
  })

  context('#getEntry', () => {
    it('returns the right entry based on an id', () => {
      assert.deepEqual(store.getEntry(MOCK_ENTRY_ID), MOCK_ENTRY)
    })
    it('noops if entry does not exist', () => {
      truncateMemory(store)
      assert.equal(store.getEntry(MOCK_ENTRY_ID), undefined)
    })
  })

  context('#createEntry', () => {
    it('creates a new entry if it doesn\'t already exist', () => {
      truncateMemory(store)
      let created = store.createEntry(MOCK_ENTRY_ID, MOCK_ENTRY)
      assert.deepEqual(store.getEntry(MOCK_ENTRY_ID), created)
    })
    it('noops if entry already exists', () => {
      assert.equal(store.createEntry(MOCK_ENTRY_ID), undefined)
    })
  })

  context('#removeEntry', () => {
    it('removes an entry that already exists', () => {
      store.removeEntry(MOCK_ENTRY_ID)
      let isEmpty = _.isEmpty(store.getEntry(MOCK_ENTRY_ID))
      assert.ok(isEmpty)
    })
    it('noops if entry does not exist', () => {
      truncateMemory(store)
      assert.equal(store.removeEntry(MOCK_ENTRY_ID), undefined)
    })
  })

  context('#updateEntry', () => {
    it('updates an existing entry', () => {
      store.updateEntry(MOCK_ENTRY_ID, UPDATE_ENTRY_DATE)
      assert.deepEqual(store.getEntry(MOCK_ENTRY_ID), UPDATED_ENTRY)
    })
    it('noops if entry does not exist', () => {
      truncateMemory(store)
      assert.equal(store.updateEntry(MOCK_ENTRY_ID), undefined)
    })
  })
})
