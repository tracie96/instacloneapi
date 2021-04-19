const mongoose= require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
title:{
type: String,
required:true
},
body:{
    type: String,
    required:true
},
photo:{
    type: String,
    default:"NoPhoto"
},
postedBy:{
    type: ObjectId,
    ref:"User"
}
})

module.exports = mongoose.model("Posts", postSchema)