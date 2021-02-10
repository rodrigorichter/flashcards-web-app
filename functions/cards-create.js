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


  console.log("Function `cards-create` invoked", data)
  const cardItem = {
    data: {
      "front": data['front'],
      "back": data['back'],
      "deck": q.Ref(q.Collection("Deck"), data['deckId'])
    }
  }
  /* construct the fauna query */
  return client.query(q.Create(q.Ref("classes/Card"), cardItem))
  .then((response) => {
    console.log("success", response)
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
