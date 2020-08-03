var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var User=require("./models/user");
var flash=require("connect-flash");
var passport=require("passport");
var LocalStrategy=require("passport-local")
var passportLocalmongoose=require("passport-local-mongoose");
var methodOverride=require("method-override");
var campground=require("./models/campgrounds");
var Comment=require("./models/Comments");
var seedDB=require("./seed");

// seedDB();


app.use(flash());
//passport requirements
app.use(require("express-session")({
    secret:"HO HO HO santa returns",
    resave:false,
    saveUninitialized:false,
   
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.CurrentUser= req.user;
    res.locals.error=req.flash("error"); 
    res.locals.success=req.flash("success"); 
    next();
})



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

mongoose.set('useFindAndModify', false);

var commentroutes   =require("./routes/comments"),
    authroutes      =require("./routes/auth"),
    campgroundroutes=require("./routes/campgrounds");


app.use(commentroutes);
app.use(authroutes);
app.use("/campgrounds",campgroundroutes);    
app.use("/campgrounds/:id/comment",commentroutes);

mongoose.connect("mongodb://localhost:27017/yelp_camp_V5", {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("error"+" ");
console.log(err);
});




app.get("/",function(req,res){
    res.render("landing");
})

app.listen("7000",function(){
    console.log("yelpcamp is started");
});