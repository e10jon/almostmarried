import {getRepository} from 'typeorm'

import {User} from '../entities/user'

export default ({io, socket}) => async alert => {
  const userRepo = getRepository(User)
  const user = await userRepo.findOne(socket.user.sub)
  if (!user || !user.isAdmin()) throw new Error('invalid user')
  io.emit('new alert', alert)
}