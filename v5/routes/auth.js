var express=require("express");
var router=express.Router();
var passport=require("passport")
var User=require("../models/user");

//regiter routesssssssssssssssssssssssss=========================
//Show-to show the register form
router.get("/register",function(req,res){
    res.render("register");
});
//handlling user signup process
router.post("/register",function(req,res){
    req.body.username;
    req.body.password;

   User.register(new User({username:req.body.username}),req.body.password,function(err,User_created){
       if(err)
       {    
           console.log(err);
            req.flash("error",err.message);
           res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
        req.flash("success","Welcome to YelpCamp "+ User_created.username);
           res.redirect("/campgrounds");
       })
   })
})
//==================================
//LOGIN ROUTES
//==================================

router.get("/login",function(req,res){
    res.render("login");
}) 

router.post("/login",passport.authenticate("local",{
    successFlash:"Welcome Back!!",
    successRedirect:"/campgrounds",
    failureFlash:"Something went wrong!!",
    failureRedirect:"/login"

}) ,function(req,res){
    
});

router.get("/logout",function(req,res){
    req.flash("success","Logged you out!");
    req.logout();
    res.redirect("/campgrounds");
});


module.exports=router;