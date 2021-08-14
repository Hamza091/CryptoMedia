const express = require('express')
const mongoose = require('mongoose')
const handleRequest = require('./Routes/CryptoRoutes')
const bodyParser = require('body-parser')
const http = require("http")
const socketIo = require("socket.io")
const cors = require("cors")
const Ranking = require('./Controllers/Ranking')
const path = require('path');

const app = express() 
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('./Client/build'));



const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
    //   origin: "https://example.com",
      // origin: "http://localhost:3000",
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  })

//   app.set('socketio',io)

global.io=io

io.on("connection",(socket)=>{
    console.log("New client connected")

    Ranking()
    
    socket.on("disconnect",()=>{
        console.log("Client disconnected")}
    )
})



// const connectionString = process.env.MONGO_URI
const PORT =  8000
// mongoose.connect("mongodb://mongo:27017/cryptomedia")
mongoose.connect('mongodb+srv://hamza:hk123@cluster0.ycueu.mongodb.net/cryptomedia?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    server.listen(PORT,()=>{
        console.log("server is running...")
    })
    app.use('/api',handleRequest)
    app.get("*", (req, res) => { //our GET route needs to point to the index.html in our build
      res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
    });
})
.catch((e)=>{
    console.log(e)
})

