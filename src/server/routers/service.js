/* Service routes */
import express from 'express'

let router = express.Router()

/* --------- BEGIN Route declarations --------- */
router.get('/health', health)

/* --------- BEGIN Route handlers --------- */
function health (req, res) {
  res.json({'message': 'Everything is awesome'})
}

export default router
