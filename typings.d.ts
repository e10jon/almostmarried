interface Chat {
  body: string,
  createdAt: Date,
  id: number,
  user: User,
}

interface User {
  id: number,
  handle: string,
}