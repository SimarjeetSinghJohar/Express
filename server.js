var express = require('express')
var app = express()
app.use(express.static(__dirname))

app.get('/message', (req, rep) => {
    rep.send('hello')
})
var server = app.listen(3000 ,() => {
    console.log('The server is running on port',server.address().port)
})
