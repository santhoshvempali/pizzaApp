// const { redirect } = require("express/lib/response");

function guest(req,res,next){
    if(!req.isAuthenticated()){
        return next()
    }
    return res.redirect("/")
}


module.exports=guest