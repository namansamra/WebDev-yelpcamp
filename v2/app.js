var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("error");
});

var yelpbody=new mongoose.Schema({

    name:String,
    image:String,
    description:String
});

var campground=mongoose.model("campground",yelpbody);


// campground.create(
//     {  name: "kailash",       
//         image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w m                                   =500&q=60"
//         ,description:"great mountain"

//     },
//     function(err,return_campgrounds)
//     {
//         if(err)
//         console.log(err);
//         else
//         console.log(return_campgrounds);
//     }
// );


app.use(bodyParser.urlencoded({extended:true}));

// var campgrounds=[

//     {  name:"mount everest",   image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"},
//     {  name: "himalaya",       image: "https://s27363.pcdn.co/wp-content/uploads/2016/01/Julie-Rivenbark-on-Trolltunga-1163x775.jpg.optimal.jpg"},
//     {  name: "kailash",        image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {  name:"mount everest",   image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"},
//     {  name: "himalaya",       image: "https://s27363.pcdn.co/wp-content/uploads/2016/01/Julie-Rivenbark-on-Trolltunga-1163x775.jpg.optimal.jpg"},
//     {  name: "kailash",        image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {  name:"mount everest",   image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"},
//     {  name: "himalaya",       image: "https://s27363.pcdn.co/wp-content/uploads/2016/01/Julie-Rivenbark-on-Trolltunga-1163x775.jpg.optimal.jpg"},
//     {  name: "kailash",        image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
//     ]

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
    campground.findById(req.params.id,function(err,camp_of_id)
    {   if(err)
        console.log(err);

        else
        res.render("show",{campgrounds:camp_of_id});
    })
    
});
  
app.listen("7000",function(){
    console.log("yelpcamp is started");
})