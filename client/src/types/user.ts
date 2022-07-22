export interface User {
  name: string
  email: string
  role: string
  avatar: {
    url: string
    public_id: string
  }
  active: boolean
}
