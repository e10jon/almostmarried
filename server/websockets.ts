import * as Io from 'socket.io'

import createAlert from '../functions/create-alert'
import createChat from '../functions/create-chat'
import createUserVerificationCode from '../functions/create-user-verification-code'
import leaveRoom from '../functions/leave-room'
import joinRoom from '../functions/join-room'
import verifyCode from '../functions/verify-code'
import jwtAuth from '../middlewares/jwt-auth'

export default (server) => {
  const io = Io(server)

  io.use(jwtAuth())

  let numConnectedUsers = 0

  io.on('connection', (socket: any) => {
    ++numConnectedUsers
    io.emit('num connected users', numConnectedUsers)

    socket.on('join room', joinRoom(socket))
    socket.on('leave room', leaveRoom(socket))
    socket.on('new chat', createChat({io, socket}))
    socket.on('verify email', createUserVerificationCode(socket))
    socket.on('verify code', verifyCode(socket))
    socket.on('new alert', createAlert({io, socket}))

    socket.on('disconnect', () => {
      --numConnectedUsers
      io.emit('num connected users', numConnectedUsers)
    })
  })
}