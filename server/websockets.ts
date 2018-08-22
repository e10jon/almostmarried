import * as addSession from 'express-socket.io-session'
import * as Io from 'socket.io'

export default (server, {session}) => {
  const io = Io(server)

  io.use(addSession(session))

  io.on('connection', socket => {
    let currentRoom: string = null

    socket.on('join room', room => {
      currentRoom = room
      socket.join(room)
    })

    socket.on('leave room', room => {
      currentRoom = null
      socket.leave(room)
    })

    socket.on('new message', message => {
      io.to(currentRoom).emit('new message', message)
    })
  })
}