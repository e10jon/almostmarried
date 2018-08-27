export default socket => room => {
  socket.room = null
  socket.leave(room)
}