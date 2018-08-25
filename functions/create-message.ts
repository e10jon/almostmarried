export default ({io, socket}) => message => {
  io.to(socket.room).emit('new message', {message, user: socket.user})
}