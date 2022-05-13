const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customers/cartController")
const homeControler=require("../app/http/controllers/homeController")

function initRoutes(app){
    app.get("/",homeControler().index)
    app.get("/login",authController().login)
    app.get("/register",authController().register)

    app.get("/cart",cartController().cart)
    app.post("/update-cart",cartController().update)
    
}


module.exports=initRoutes