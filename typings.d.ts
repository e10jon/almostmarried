interface Chat {
  body: string,
  createdAt: Date,
  id: number,
  user: User,
}

interface User {
  id: number,
  isAdmin: boolean,
  handle: string,
}

interface Window {
  gtag?: any,
}