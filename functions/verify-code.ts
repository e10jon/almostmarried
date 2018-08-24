import {getRepository} from 'typeorm'

import {User} from '../entities/user'

export default socket => async ([code, email]) => {
  const repository = getRepository(User)
  const user = await repository.findOne({where: {email}})
  if (user && user.verificationCode === parseInt(code)) {
    const authUser = user.toAuth()
    socket.user = authUser
    socket.emit('code verified', authUser)
  } else {
    socket.emit('code verification failed')
  }
}