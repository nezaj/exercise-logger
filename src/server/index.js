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

import config from '../../webpack.config'
import { bootstrap, seed, MemoryStore } from './data'
import { UnsupportedStoreError } from './errors'
import { apiRouter, serviceRouter } from './routers'

function _create_store (store_type) {
  if (store_type === 'memory') {
    return new MemoryStore()
  } else {
    throw UnsupportedStoreError(store_type)
  }
}

function main (opts) {
  // Initialize app
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

  // Route middlewares
  app.use('/service', serviceRouter)
  app.use('/api', apiRouter)

  /* --------- END Middlewares --------- */

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
