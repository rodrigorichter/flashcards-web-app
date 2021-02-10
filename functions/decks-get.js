const faunadb = require('faunadb')

const q = faunadb.query
var client = {};

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)

  client = new faunadb.Client({
    secret: data['secret']
  })
  return client.query(

    q.Map(
      q.Paginate(q.Match(q.Index("allDecks"))),
      q.Lambda('deckRef', q.Get(q.Var('deckRef')))
    )

  )
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
