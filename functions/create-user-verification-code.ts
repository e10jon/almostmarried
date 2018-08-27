import {internet as fakerInternet} from 'faker'
import {getRepository} from 'typeorm'

import {User} from '../entities/user'
import sendSESMail from '../functions/send-ses-mail'
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

  // send the email
  const message = `Your verification code is ${user.verificationCode}.`
  const sendOpts = {
    bodyHTML: `<div>${message}</div>`,
    bodyText: message,
    subject: message,
    to: email,
  }
  await sendSESMail(sendOpts)
  socket.emit('code email sent')
}