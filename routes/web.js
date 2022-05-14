const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customers/cartController")
const homeControler=require("../app/http/controllers/homeController")
const guest=require("../app/http/middleware/guest")

function initRoutes(app){
    //home page
    app.get("/",homeControler().index)
    //goes to login  page
    app.get("/login",guest,authController().login)
    // logs in the user
    app.post("/login",authController().doLogin)
    app.get("/register",guest,authController().register)
    app.post("/register",authController().createAccount)
    app.post("/logout",authController().logout)
    app.get("/cart",cartController().cart)
    app.post("/update-cart",cartController().update)
    
}


module.exports=initRoutes