/* API Routes */
import _ from 'lodash'
import express from 'express'

let router = express.Router()

/* --------- BEGIN Route declarations --------- */
router.get('/entries', listEntries)
// app.post('/entries', createEntry)
router.delete('/entries/:id', deleteEntry)
router.post('/entries/:id', updateEntry)

/* --------- BEGIN Route handlers --------- */
function deleteEntry (req, res) {
  const id = req.params.id
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
  const id = req.params.id
  const params = req.body
  let updated = req.app.store.updateEntry(id, params)
  res.json(update)
}

export default router
