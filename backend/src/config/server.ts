require('dotenv').config()

const domain = process.env.DOMAIN

const version = process.env.VERSION

const commonRoute = `/api/${version}`

const routes = {
  auth: `${commonRoute}/auth`,
  user: `${commonRoute}/user`
}

const server = {
  domain,
  version,
  commonRoute,
  routes
}

export default server
