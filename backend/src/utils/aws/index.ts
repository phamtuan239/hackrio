import AWS, { ConfigurationOptions } from 'aws-sdk'
import awsConf from '../../config/aws'
import mail from '../../config/mail'
import { throwValidationError } from '../error/mongodb-error'
import { registerEmailParams } from './email'

const config: ConfigurationOptions = {
  accessKeyId: awsConf.accessKeyId,
  secretAccessKey: awsConf.secretAccessKey,
  region: awsConf.region
}

AWS.config.update(config)

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

export const sendMailSES = async (
  email: string,
  link: string,
  method: string
) => {
  let params = null
  switch (method) {
    case mail.method.register:
      params = registerEmailParams(email, link)
      break
  }
  console.log(method)
  console.log(params)
  if (params) {
    console.log('send')
    try {
      await ses.sendEmail(params).promise()
    } catch (error) {
      throw error
    }
  }
  throwValidationError('server', 'method auth not match', true)
}
