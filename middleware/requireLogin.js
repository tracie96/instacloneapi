const jwt = require('jsonwebtoken')
const {JWT_SECRET}= require('../keys')
const userModel = require('../model/user.model')
module.exports= (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({
            message:" You must be logged in"
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({
                error:"Invalid Token"
            })
        }
        const {_id} = payload
        userModel.findById(_id).then(userdata=>{
            req.user = userdata
            next()

        })

    })
}