import {getRepository} from 'typeorm'

import {Chat} from '../entities/chat'
import {User} from '../entities/user'

export default ({io, socket}) => async body => {
  const chatRepo = getRepository(Chat)
  const userRepo = getRepository(User)

  const user = socket.user ? await userRepo.findOne(socket.user.sub) : null
  if (!user) throw new Error('invalid user')

  const chat = new Chat()
  chat.room = socket.room
  chat.user = user
  chat.body = body 
  await chatRepo.save(chat)
  
  io.to(socket.room).emit('new chat', chat)
}