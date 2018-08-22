import * as addSession from 'express-socket.io-session'
import * as Io from 'socket.io'

export default (server, {session}) => {
  const io = Io(server)

  io.use(addSession(session))

  io.on('connection', socket => {
    console.log('connected!')

    socket.on('disconnect', () => {
      console.log('disconnected!')
    })
  })
}