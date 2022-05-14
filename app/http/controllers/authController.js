const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    async doLogin(req,res,next){
      try {
        passport.authenticate('local',(err,user,info)=>{
          if(err){
            req.flash("error",info.message)
            return next(err)
          }
          if(!user){
            req.flash("error",info.message)
            return res.redirect("/login")
          }
          req.logIn(user,(err)=>{
            if(err){
            req.flash("error",info.message)
            return next(err)
            }
            return res.redirect("/")
          })
        })(req,res,next)
      } catch (error) {
          console.log(error)
      }
    },
    register(req, res) {
      res.render("auth/register");
    },
    async createAccount(req, res) {
      const { name, email, password }   = req.body
      // Validate request 
      if(!name || !email || !password) {
          req.flash('error', 'All fields are required')
          req.flash('name', name)
          req.flash('email', email)
         return res.redirect('/register')
      }

      // Check if email exists 
      User.exists({ email: email }, async (err, result) => {
          if(result) {
             req.flash('error', 'Email already taken')
             req.flash('name', name)
             req.flash('email', email) 
             return res.redirect('/register')
          }
          try {
          const hashPassword = await bcrypt.hash(password, 10);
          console.log(hashPassword);
          User.insertMany(
              { name: name, email: email, password: hashPassword },
              (err, data) => {
                if (data) {
                  return res.redirect("/");
                } else {
                  req.flash("error", "Error while creating account");
                  console.log(err);
                  return res.redirect("/register");
                }
              }
            );
          } catch (error) {
            console.log(error)
          }

      })
    },
    async logout(req,res){
      req.logout()
      res.redirect("/login")
    }
  };
}

module.exports = authController;
