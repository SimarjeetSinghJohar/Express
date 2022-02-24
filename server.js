var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())  //app knows we are parsing the body
app.use(bodyParser.json())  //app knows we are parsing the body

var messages = [
    {name:'Tim', message: 'Hey'},
    {name:'Simar', message: 'Hello!!'}
]
app.get('/messages', (req, res) => {
    res.send(messages)
})
app.post('/messages' , (req, res) =>{
    messages.push(req.body)
    res.sendStatus(200)
})
var server = app.listen(3000 ,() => {
    console.log('The server is running on port',server.address().port)
})
