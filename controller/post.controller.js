const Posts = require('../model/post.model')

exports.create =async(req,res,next)=>{
    try{
        const {title,body} =req.body
        if(!title || !body){
            res.status(422).json({
                error:"Please add all the fields"
            })
        }
        req.user.password=undefined
        const newPost =new Posts({
            title,body,postedBy:req.user
        })
        newPost.save().then(savedpost=>{
            if(savedpost){
                return res.json({
                    message :"postcreated",
                    payload:savedpost
                })
            }
        })

    }
  catch(err){
      console.log(err)
  }

}

exports.getPost = async(req,res,next)=>{
    const getPost = Posts.find().populate("postedBy","_id name").then(allpost=>{
    if(allpost){
        return res.status(200).json({
            message:"All Post",
            allpost
        })
    }
    })
}

exports.myPost = async(req,res,next)=>{
    const myPost = Posts.find({postedBy:req.user._id}).populate("postedBy", "_id name").then(mypost =>{
        if(mypost){
            return res.status(200).json({
                message:"Your Post",
                mypost
            })
        }
        else{
            console.log(err)
        }
    })
}