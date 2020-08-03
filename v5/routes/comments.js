
var express=require("express");
var router=express.Router({mergeParams:true});
var User=require("../models/user");
var campground=require("../models/campgrounds");
var Comment=require("../models/Comments");
var middleware=require("../middleware/index");



//commentnew--to show form for adding comment
router.get("/newcomment",middleware.isLoggedIn, function(req,res){
    //find campground

    campground.findById(req.params.id,function(err,campground_found){
        if(err)
        console.log(err)

        else
        res.render("newcomment",{campgrounds:campground_found});
    })

});
  
router.post("/comment_created",function(req,res){
    //look up for the campground with id
    campground.findById(req.params.id,function(err,found_camp){
        if(err){
        console.log(err)
        req.flash("error","something went wrong!!!");
         }
        else{
             //creat a new comment
            Comment.create(req.body.comment,function(err,created_comment){
            if(err)
            res.redirect("/campgrounds")

            else{
                //add username and id to comment
                created_comment.author.id=req.user._id;
                created_comment.author.username=req.user.username;

                //save user
                created_comment.save();

                //connect the new comment to campground
                found_camp.comments.push(created_comment);
                found_camp.save();
                req.flash("success","Comment successfully added!!")
                //redirectr the page somewhere
                res.redirect("/campgrounds/"+found_camp._id);

            }
        })
        
    }

    })
});

//to edit COMMENT
router.get("/:comment_id/edit",middleware.checkcommentOwnership,function(req,res){
   Comment.findById(req.params.comment_id,function(err,founded_comment){
       if(err)
       res.redirect("back");
       else
       res.render("commentedit",{campgrounds_id:req.params.id,comment:founded_comment});
   })
});

//to UPDATE COMMENT

router.put("/:comment_id",middleware.checkcommentOwnership,function(req,res){
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated_comment){
         if(err)
         res.redirect("back");
         else{req.flash("success","Comment Updated!!")
         res.redirect("/campgrounds/"+req.params.id);
         }
     })
});

//DELETE COMMENTS
router.delete("/:comment_id",middleware.checkcommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        res.redirect("back");
        else
        {req.flash("success","Comment deleted!!");
        res.redirect("/campgrounds/"+req.params.id); 
        }
    })
})





module.exports=router;