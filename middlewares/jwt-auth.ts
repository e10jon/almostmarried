import * as jwt from 'jsonwebtoken'

export default () => async (socket, next) => {
  const token = socket.handshake.query && socket.handshake.query.token
  if (token) {
    try {
      socket.user = await jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch (err) {
      next(new Error('Authentication error'))
    }
  }
}