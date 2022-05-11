const express=require("express");
require("dotenv").config()
const ejs=require("ejs")
const expressLayouts=require("express-ejs-layouts");
const path=require("path")
const PORT=process.env.PORT || 4000
app=express()
app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.render("home");
})
app.use(expressLayouts)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')



try {
    app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`)
    })
} catch (error) {
    console.log("error in firing serever",error)
;}