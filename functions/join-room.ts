import {getRepository} from 'typeorm'

import {Chat} from '../entities/chat'

export default socket => async room => {
  socket.room = room
  socket.join(room)

  const repo = getRepository(Chat)
  const chats = (await repo.find({where: {room}, order: {createdAt: 'DESC'}, take: 60})).reverse()
  socket.emit('joined room', chats)
}