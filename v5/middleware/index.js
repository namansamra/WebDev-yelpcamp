var campground=require("../models/campgrounds");
var Comment=require("../models/Comments");

var middlewareObj={};


//to check the ownership of campgrounds
middlewareObj.checkcampgroundOwnership=function (req,res,next){
    //-->>is logged in
    if(req.isAuthenticated())
    {
        campground.findById(req.params.id,function(err,foundcamp){
            if(err)
            {   req.flash("error","Campground not found!")
                console.log(err);
                res.redirect("back");
            }
            else{
                //->is it same user's campground 
                if(foundcamp.author.id.equals(req.user._id))//these are same when print but are stored differently
                                                               //so we cant use === for checking
                  {     
                        next();
                  }                                       
                //->campground owner not same----->redirect somewhere
                else
                {   req.flash("error","You do not have permission to do that!!")
                    res.redirect("back");   
                }
            }
        });
    }

    //-->>not logged in------>redirect somewhere
    else
    {   req.flash("error","You need to be logged in!")
        res.redirect("back");   
    }
}


//to check the ownership of comment

middlewareObj.checkcommentOwnership=function(req,res,next){
    //-->>is logged in
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err)
            {
                console.log(err);
                res.redirect("back");
            }
            else{
                //->is it same user's comment 
                if(foundcomment.author.id.equals(req.user._id))//these are same when print but are stored differently
                                                               //so we cant use === for checking
                  { 
                        next();
                  }                                       
                //->comment owner not same----->redirect somewhere
                else
                {   req.flash("error","You do not have permission to do that!!");
                    res.redirect("back");   
                }
            }
        });
    }

    //-->>not logged in------>redirect somewhere
    else
    {   
        res.redirect("back");   
    }
}


//middleware--------
middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error","Please Login!!!!");
    res.redirect("/login");
}


module.exports=middlewareObj;