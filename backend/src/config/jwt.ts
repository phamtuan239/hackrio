require('dotenv').config()

const jwtSecect = process.env.JWT_SECRET

const timeRefeshToken = '60m'

const timeAccessToken = '1m'

const jwt = { jwtSecect, timeAccessToken, timeRefeshToken }

export default jwt
