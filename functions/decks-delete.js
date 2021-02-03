const faunadb = require('faunadb')

const q = faunadb.query
var client = {};

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)

  client = new faunadb.Client({
    secret: data['secret']
  })

  return client.query(q.Delete(q.Ref(q.Collection('Decks'), data['id'])))
  .then((response) => {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log(error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
