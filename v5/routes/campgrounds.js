var express=require("express");
var router=express.Router();
var User=require("../models/user");
var Comment=require("../models/Comments");
var campground=require("../models/campgrounds");
var middleware=require("../middleware/index");



//Index :to show the campgrounds
router.get("/",function(req,res){
    //campground from database

    campground.find({},function(err,all_campgrounds)
        {
            if(err)
            console.log(err);

            else
            res.render("campgrounds",{campgrounds:all_campgrounds,CurrentUser:req.user});

        
        });

    // res.render("campgrounds",{campgrounds:campgrounds});
});

//CREAT---- to creat a new campground in data base
router.post("/",middleware.isLoggedIn,function(req,res){

var newcamp=req.body.campname;
var newimage=req.body.campimage;
var descrip=req.body.description;
var author={
    id:req.user._id,
    username:req.user.username
}
var object={name:newcamp,image:newimage,description:descrip,author:author};

campground.create(object,function(err,newlycamp){
    if(err)
    console.log(err);

    else
    res.redirect("/campgrounds");

});
});

//NEW---show the form
router.get("/new",middleware.isLoggedIn,function(req,res){
res.render("new");
});
//SHOW----to show a particular 
router.get("/:id",function(req,res){
campground.findById(req.params.id).populate("comments").exec(function(err,camp_of_id)
{   if(err)
    console.log(err);

    else
    res.render("show",{campgrounds:camp_of_id});
}
)

});

//EDIT CAMPGROUNDS ROUTES
router.get("/:id/edit",middleware.checkcampgroundOwnership,function(req,res){
        campground.findById(req.params.id,function(err,foundcamp){
            if(err)
                console.log(err);
            else
            res.render("edit",{campground:foundcamp});  
});

});


//UPDATE CAMPGROUND ROUTES
router.put("/:id",middleware.checkcampgroundOwnership,function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updated_camp){
        if(err)
        {console.log(err);
            res.redirect("/campgrounds");
        }
        else{
        req.flash("success","Campground Updated!!");
        res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DELETE a route

router.delete("/:id",middleware.checkcampgroundOwnership,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        res.redirect("/campgrounds");
        else
        {req.flash("success","Campground deleted!!");
        res.redirect("/campgrounds");
       }
    })
});




module.exports=router;