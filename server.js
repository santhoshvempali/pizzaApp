const express=require("express");
require("dotenv").config()
const ejs=require("ejs")
const expressLayouts=require("express-ejs-layouts");
const path=require("path")
const mongo_cllient=require("./app/config/db-config");
mongo_cllient.connect();
const PORT=process.env.PORT || 4000
const session=require("express-session");
const flash=require("express-flash");
const mongoStore=require("connect-mongo");
const res = require("express/lib/response");
app=express()

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*10},//10 min,
    store: mongoStore.create({
        mongoUrl:"mongodb://localhost:27017/pizza-app",
    })
}));
app.use(flash())
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})
app.use(express.json())
app.use(express.static("public"))
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require("./routes/web")(app);


try {
    app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`)
    })
} catch (error) {
    console.log("error in firing serever",error)
;}