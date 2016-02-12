import path from 'path'

import _ from 'lodash'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import program from 'commander'
import ReactDOMServer from 'react-dom/server'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import bootstrap from './data/bootstrap'
import config from '../../webpack.config'
import seed from './data/seed'
import { MemoryStore } from './data/store'
import { UnsupportedStoreError } from './errors'

function _create_store (store_type) {
  if (store_type === 'memory') {
    return new MemoryStore()
  } else {
    throw UnsupportedStoreError(store_type)
  }
}

function main (opts) {
  // Initialize koa app
  let app = express()

  // Create store
  let store = _create_store(opts.store)
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    bootstrap(opts.store, store, seed)
  }
  app.store = store

  /* --------- BEGIN Middlewares --------- */
  // Logging
  app.use(morgan('dev'))

  // Cross Origin Resource Sharing
  app.use(cors())

  // Configure static directory
  const staticDir = path.join(__dirname, '..', '..', 'build')
  app.use(express.static(staticDir))

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  // Routes middlewares
  app.get('/health', health)
  app.get('/entries', listEntries)
  app.delete('/entries/:id', deleteEntry)
  app.post('/entries/:id', updateEntry)

  /* --------- END Middlewares --------- */

  /* --------- BEGIN Route handlers --------- */
  function health (req, res) {
    res.json({'message': 'Everything is awesome'})
  }

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
  /* ---------- END Route handlers ---------- */

  // Create HTTP server
  let port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Express listening on port ${port}`)
}

if (require.main === module) {
  program
  .description('Info: Starts the backend koa.js webserver')
  .usage(': babel-node --harmony server.py [options]')
  .option('-s --store <name>',
          'specify type of store (memory|mongo) [memory]', 'memory')
  .parse(process.argv)

  main(program)
}
