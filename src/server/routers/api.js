/* API Routes */
import _ from 'lodash'
import express from 'express'

let router = express.Router()

/* --------- BEGIN Route declarations --------- */
router.get('/entries', listEntries)
router.post('/entries', createEntry)
router.delete('/entries/:id', deleteEntry)
router.post('/entries/:id', updateEntry)

/* --------- BEGIN Route handlers --------- */
function createEntry (req, res) {
  let entry = req.body
  let newEntry = req.app.store.createEntry(entry.id, entry)
  res.json(newEntry)
}

function deleteEntry (req, res) {
  let id = req.params.id
  let removed = req.app.store.removeEntry(id)
  res.json(removed)
}

function listEntries (req, res) {
  let entries = req.app.store.getEntries()
  let sortedEntries = _.sortBy(entries, (e) => {
    return new Date(e.date) * -1 // reverse chronological order
  })

  res.json(sortedEntries)
}

function updateEntry (req, res) {
  let id = req.params.id
  let params = req.body
  let updated = req.app.store.updateEntry(id, params)
  res.json(updated)
}

export default router
