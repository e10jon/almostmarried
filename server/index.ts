import * as express from 'express'
import * as addSession from 'express-session'
import * as next from 'next'

import addWebsockets from './websockets'
import prepareTypeorm from './typeorm'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

Promise.all([
  prepareTypeorm(),
  nextApp.prepare(),
]).then(() => {
  const session = addSession({
    resave: false,
    saveUninitialized: false,
    secret: 'abc123',
  })
  const app = express()

  app.use(session)
  app.get('*', (req, res) => handle(req, res))
    
  const server = app.listen(port)
  
  addWebsockets(server, {session})
})