const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const {MONGOURI}  =require('./keys')
app.use(express.json())
const routes = require('./routes')

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    UnifiedTopology: true 
}
    
    )
mongoose.connection.on('connected',()=>{
    console.log("connected")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting")
})


app.listen(PORT,()=>{
    console.log("Server is listening")
})
app.use('/', routes)
