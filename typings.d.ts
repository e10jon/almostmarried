interface Chat {
  body: string,
  createdAt: Date,
  id: number,
  user: User,
}

interface SendMailOpts {
  cc?: string[],
  to: string | string[],
  bodyHTML: string,
  bodyText: string,
  subject: string,
}

interface User {
  id: number,
  handle: string,
}