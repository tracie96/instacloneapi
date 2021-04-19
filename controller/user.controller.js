const User = require('../model/user.model')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}= require('../keys')

exports.create = async(req,res,next)=>{
    const {name, email,password} = req.body
    try{
        if(!email || !password){
            return res.status(422).json({
                message: "Email and Passwords cant be empty"
            })
        }
        const userExist = await User.findOne({
            email
          }).exec();
          if (userExist) {
            return res.json(
              {
                  message :"user already exist"
              }
            );
          }
    bycrpt.hash(password,12).then(hashedpassword=>{
        const saveUser = new User({
            name,
            email,
            password:hashedpassword
        })
        saveUser.save()
        return res.status(200).json({
            "payload": saveUser
        })

    })          

    
    }
    catch(err){
        console.log(err)

    }
}

exports.signin = async(req,res,next)=>{
    try{
        const {email,password} = req.body
        if(!email, !password){
            return res.json({
                status:422,
                error:"Please add email or password"
            })
        }

        User.findOne({email:email}).then(savedUser => {
            if(!savedUser){
                return res.status(422).json({
                    error:"Invalid Email or Password"
                })
            }
            bycrpt.compare(password, savedUser.password).then(doMatch=>{
                if(doMatch){
                    const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                    const { _id,name, email} = savedUser
                    res.json({
                        message:"Successfully signed in",
                        token: token,
                        user:{_id,name,email}
                    })
                }
                else{
                    res.json({
                        error:" Invalid email or password"
                    })
                }
            })


        })
  
    }
    catch(err){
        console.log(err)
    }

}

exports.protected = async(req,res,next)=>{
    res.send("hello")
}