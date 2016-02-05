import _ from 'lodash'
import cors from 'koa-cors'
import koa from 'koa'
import logger from 'koa-logger'
import program from 'commander'
import route from 'koa-route'

import bootstrap from './data/bootstrap'
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
  let app = koa()

  // Create store
  let store = _create_store(opts.store)
  if (app.env === 'development') {
    bootstrap(opts.store, store, seed)
  }
  app.context.store = store

  // Middlewares
  app.use(cors())
  app.use(logger())

  // Routes middlewares
  app.use(route.get('/health', health))
  app.use(route.get('/entries', listEntries))

  // Route handlers
  function * health () {
    this.body = {'message': 'Everything is awesome'}
  }

  // TODO: Add a test-case for this function
  function * listEntries () {
    let entries = this.store.getEntries()
    let sortedEntries = _.sortBy(entries, (e) => {
      return new Date(e.date) * -1 // reverse chronological order
    })

    this.body = sortedEntries
  }

  // Create HTTP server
  let port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Koa listening on port ${port}`)
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
