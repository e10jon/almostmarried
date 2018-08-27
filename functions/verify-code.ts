import * as jwt from 'jsonwebtoken'
import {getRepository} from 'typeorm'

import {User} from '../entities/user'

export default socket => async ([code, email]) => {
  const repository = getRepository(User)
  const user = await repository.findOne({where: {email}})
  if (user && (
    (process.env.NODE_ENV === 'development' && code === '1') ||
    user.verificationCode === parseInt(code)
  )) {
    const token = jwt.sign({sub: user.id}, process.env.JWT_SECRET)
    socket.emit('code verified', {token, user: {id: user.id, handle: user.handle, isAdmin: user.isAdmin()}})
  } else {
    socket.emit('code verification failed')
  }
}