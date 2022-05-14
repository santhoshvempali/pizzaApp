const User = require("../models/user")
const passportLocal=require("passport-local").Strategy
const bcrypt=require("bcrypt")


function init(passport){
    passport.use(new passportLocal({usernameField:"email"},async (email,password,done)=>{
        console.log(1)
        const user=await User.findOne({email:email})
        if(!user){
            return done(null,false,{message:"No user with this email"})
        }
        bcrypt.compare(password,user.password).then(match =>{
            if(match){
                return done(null,user,{message: "match in Successfully"})
            }
            return done(null,false,{message:"Wrong username or password"})
        }).catch(err=>{
            return done(null,false,{message:"Something went Wrong"})

        })
    }))
    console.log(2)
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    console.log(3)
    passport.deserializeUser((id,done)=>{
        User.findOne({_id:id},(err,user)=>{
            done(err,user)
        })
    })
}

module.exports=init