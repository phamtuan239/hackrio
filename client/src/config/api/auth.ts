type Auth = {
  REGISTER: string
  LOGIN: string
  LOGOUT: string
  AUTH_INFO: string
  SEND_MAIL: string
  FORGOT_PASSWORD: string
}

const auth: Auth = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  AUTH_INFO: '/auth',
  SEND_MAIL: '/auth/send-mail',
  FORGOT_PASSWORD: '/auth/forgot-password'
}

export default auth
