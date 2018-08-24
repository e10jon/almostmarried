import {internet as fakerInternet} from 'faker'
import {getRepository} from 'typeorm'

import {User} from '../entities/user'

const createCode = () => Math.random() * (9999 - 1000) + 1000

export default async email => {
  const repository = getRepository(User)
  let user = await repository.findOne({where: {email}})
  if (!user) {
    user = new User()
    user.email = email
    user.handle = fakerInternet.userName()
    user.verificationCode = createCode()
    await repository.save(user)
  } else {
    user.verificationCode = createCode()
    await repository.save(user)
  }
  
  console.log(user)
}