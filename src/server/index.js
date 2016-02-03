import koa from 'koa'
import logger from 'koa-logger'
import route from 'koa-route'

// Initialize koa app
let app = koa()

// Middlewares
app.use(logger())

// Routes middlewares
app.use(route.get('/health', health))

// Route handlers
function * health () {
  this.body = 'Everything is awesome'
}

// Create HTTP server
let port = process.env.PORT || 3000
app.listen(port)
console.log(`Koa listening on port ${port}`)
