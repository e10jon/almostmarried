import {internet as fakerInternet} from 'faker'
import {getRepository} from 'typeorm'

import {User} from '../entities/user'
import mailgun from '../server/mailgun'

const createCode = () => Math.floor(Math.random() * (9999 - 1000) + 1000)

export default socket => async email => {
  // validate the email address
  const validateRes = await mailgun.validate(email)
  if (!validateRes || !validateRes.is_valid) {
    socket.emit('invalid signup email')
    return
  }

  // find or create a user by email
  const repository = getRepository(User)
  let user = await repository.findOne({where: {email}})
  if (!user) {
    user = new User()
    user.email = email
    user.handle = fakerInternet.userName()
  }
  user.verificationCode = createCode()
  await repository.save(user)

  // send the verification code via email
  await mailgun.messages().send({
    from: `verify@${process.env.MAILGUN_DOMAIN_NAME}`,
    to: email,
    subject: 'Your Verification Code',
    text: `Your code is ${user.verificationCode}`,
  })
  socket.emit('invalid signup email')
}