var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var campground=require("./models/campgrounds");
var Comment=require("./models/Comments");
var seedDB=require("./seed");

seedDB();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/yelp_camp_V3", {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("error");
});





app.get("/",function(req,res){
    res.render("landing");
})

//Index :to show the campgrounds
app.get("/campgrounds",function(req,res){
        //campground from database

        campground.find({},function(err,all_campgrounds)
            {
                if(err)
                console.log(err);

                else
                res.render("campgrounds",{campgrounds:all_campgrounds});

            
            });

        // res.render("campgrounds",{campgrounds:campgrounds});
});

//CREAT---- to creat a new campground in data base
app.post("/campgrounds",function(req,res){
    
    var newcamp=req.body.campname;
    var newimage=req.body.campimage;
    var descrip=req.body.description;
 
    var object={name:newcamp,image:newimage,description:descrip};

    campground.create(object,function(err,newlycamp){
        if(err)
        console.log(err);

        else
        res.redirect("/campgrounds");

    });
});

//NEW---show the form
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});
//SHOW----to show a particular 
app.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,camp_of_id)
    {   if(err)
        console.log(err);

        else
        res.render("show",{campgrounds:camp_of_id});
    }
    )
    
});

//commentnew--to show form for adding comment
app.get("/campgrounds/:id/newcomment",function(req,res){
    //find campground

    campground.findById(req.params.id,function(err,campground_found){
        if(err)
        console.log(err)

        else
        res.render("newcomment",{campgrounds:campground_found});
    })

});
  
app.post("/campgrounds/:id/comment_created",function(req,res){
    //look up for the campground with id
    campground.findById(req.params.id,function(err,found_camp){
        if(err)
        console.log(err)

        else{
             //creat a new comment
            Comment.create(req.body.comment,function(err,created_comment){
            if(err)
            res.redirect("/campgrounds")

            else{
                //connect the new comment to campground
                found_camp.comments.push(created_comment);
                found_camp.save();
                //redirectr the page somewhere
                res.redirect("/campgrounds/"+found_camp._id);

            }
        })
        
    }

    })
    
    
    
})

  
app.listen("7000",function(){
    console.log("yelpcamp is started");
})