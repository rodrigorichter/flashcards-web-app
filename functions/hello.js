exports.handler = async event => {
  const subject = event.queryStringParameters.name || 'Hello World'
  return  {
    statusCode: 200,
    body: `Hello ${subject}!`,
  }
}
