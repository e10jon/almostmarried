import {getRepository} from 'typeorm'

import {Response} from '../entities/response'
import {User} from '../entities/user'

export default ({io, socket}) => async ({alertId, body}) => {
  const responseRepo = getRepository(Response)
  const userRepo = getRepository(User)

  const user = socket.user ? await userRepo.findOne(socket.user.sub) : null

  const response = new Response()
  response.alert = alertId
  response.user = user
  response.body = body
  await responseRepo.save(response)

  io.emit('new response', response)
}