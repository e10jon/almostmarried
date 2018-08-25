import * as express from 'express'
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
  const app = express()

  app.get('*', (req, res) => handle(req, res))
    
  const server = app.listen(port)
  
  addWebsockets(server)
})