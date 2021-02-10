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
      q.Paginate(q.Match(q.Index("allCardsByDeck"), q.Ref(q.Collection("Deck"), data['deckId']))),
      q.Lambda('cardRef', q.Get(q.Var('cardRef')))
    )

  )
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
