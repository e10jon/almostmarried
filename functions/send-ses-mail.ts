import * as AWS from 'aws-sdk'

interface Opts {
  cc?: string[],
  to: string | string[],
  bodyHTML: string,
  bodyText: string,
  subject: string,
}

export default async (opts: Opts) => {
  const params = {
    Destination: {
      CcAddresses: opts.cc,
      ToAddresses: typeof opts.to === 'string' ? [opts.to] : opts.to,
    },
    Message: {
      Body: {
        Html: {
         Charset: 'UTF-8',
         Data: opts.bodyHTML,
        },
        Text: {
         Charset: 'UTF-8',
         Data: opts.bodyText,
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: opts.subject,
       }
      },
    Source: 'Ethan <ethan@almostmarried.tv>',
  };       
  
  try {
    await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise()
  } catch (err) {
    console.error(err)
  }
}