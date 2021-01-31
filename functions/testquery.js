const faunadb = require('faunadb')

const q = faunadb.query
var client = {}

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)

  client = new faunadb.Client({
    secret: data.secret
  })

  client.query(
    q.CurrentIdentity()
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error('Error: %s', err))
}
