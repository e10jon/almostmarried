import {getRepository} from 'typeorm'

import {Alert} from '../entities/alert'
import {User} from '../entities/user'

export default ({io, socket}) => async ({body, responseType}) => {
  const alertRepo = getRepository(Alert)
  const userRepo = getRepository(User)

  const user = socket.user ? await userRepo.findOne(socket.user.sub) : null
  if (!user || !user.isAdmin()) throw new Error('invalid user')

  const alert = new Alert()
  alert.user = user
  alert.body = body
  alert.responseType = responseType
  await alertRepo.save(alert)

  io.emit('new alert', alert)
}