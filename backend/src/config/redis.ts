require('dotenv').config()

const redisPort = process.env.REDIS_PORT

const redisHost = process.env.REDIS_HOST

const redis = {
  redisPort,
  redisHost
}

export default redis
