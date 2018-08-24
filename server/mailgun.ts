import * as mailgun from 'mailgun-js'

export default mailgun({
  apiKey: process.env.MAILGUN_API_KEY, 
  domain: process.env.MAILGUN_DOMAIN_NAME,
  publicApiKey: process.env.MAILGUN_PUBLIC_API_KEY,
})