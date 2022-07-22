import { SES } from 'aws-sdk'
import mail from '../../config/mail'

export const registerEmailParams = (
  email: string,
  link: string
): SES.Types.SendEmailRequest => {
  return {
    Source: 'tuantqfx08776@funix.edu.vn',
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: ['tuantqfx08776@funix.edu.vn'],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
                        <html>
                            <h1>Vefiry your email address</h1>
                            <p>Please use the following link to complete your registration:</p>
                            <a href=${link}>${link}</a>
                        </html>
                    `
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Complete your registration'
      }
    }
  }
}
