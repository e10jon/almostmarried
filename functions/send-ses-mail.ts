import * as AWS from 'aws-sdk'

export default async (opts: SendMailOpts) => {
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
    const res = await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise()
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}