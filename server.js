var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
const { response } = require('express')
app.use(express.static(__dirname))
app.use(bodyParser.json())  //EXPECTS body parser knows we are parsing the json with http request
app.use(bodyParser.urlencoded({extended:false}))  
mongoose.Promise = Promise
var dbUrl = 'mongodb+srv://Simarjeet:Simarjeet@learningnode.6o8wr.mongodb.net/LearningNode'
var Message = mongoose.model("Message", {
    name: String,
    message:String
})
 
    app.get('/messages', (req, res) => {    
        Message.find({},(err, messages) =>{
            res.send(messages)
        })
    })
    
    app.post('/messages' , async (req, res) =>{
        try{
                    var message = new Message(req.body)

                    var savedMessage = await message.save()
        
                    console.log('saved')

                    var censored = await Message.findOne({message: 'badword'})

                    if(censored) {
                    await Message.remove({_id: censored.id})
                    }
            
                else{
                    io.emit('message', req.body)

                    res.sendStatus(200)
                 }
             }
                catch(error){
                 res.sendStatus(500)
                 return console.error(error)
                }
                finally{
                    console.log("Using Post")
                }
    })
io.on('connection', (socket) =>{
console.log("a user connected")
    })
mongoose.connect(dbUrl, (err) =>{
console.log('mongo connected', err)
    })
var server = http.listen(3000, () => {
console.log('The server is running on port',server.address().port)
    })
