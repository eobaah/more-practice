const express = require('express')
const app = express()
const port = 3000
const bodyParser = require( 'body-parser' )

const jsonParser = bodyParser.json();


app.get('/api/shout/:word', (request, response) => {
  let word = request.params.word
  let result = word.toUpperCase() + "!!!"
  console.log( word )

  response.status(200).send( result )
})

app.post('/api/array/merge', jsonParser, (request, response) => {
  let arrayA = request.body.a
  let arrayB = request.body.b
  if( Array.isArray( arrayA ) && Array.isArray( arrayB ) ) {
    let merge = arrayA.map( ( currentValue, index ) => {
      return [ currentValue, arrayB[ index ] ]; } )
        .reduce( ( a, b ) => { return a.concat( b ); } );
    response.header('Content-Type: application/json').status(200).json( merge )
  } else {
    response.header('Content-Type: application/json')
      .status(400)
      .json( {"error": "Both keys in request body must be of type Array."} )
  }
})












app.listen(port, () => {
  console.log(`Your app is listening on port ${port}!`)
})
