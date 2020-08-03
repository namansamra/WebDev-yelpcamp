var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

var campgrounds=[

    {  name:"mount everest",   image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"},
    {  name: "himalaya",       image: "https://s27363.pcdn.co/wp-content/uploads/2016/01/Julie-Rivenbark-on-Trolltunga-1163x775.jpg.optimal.jpg"},
    {  name: "kailash",        image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {  name:"mount everest",   image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"},
    {  name: "himalaya",       image: "https://s27363.pcdn.co/wp-content/uploads/2016/01/Julie-Rivenbark-on-Trolltunga-1163x775.jpg.optimal.jpg"},
    {  name: "kailash",        image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {  name:"mount everest",   image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"},
    {  name: "himalaya",       image: "https://s27363.pcdn.co/wp-content/uploads/2016/01/Julie-Rivenbark-on-Trolltunga-1163x775.jpg.optimal.jpg"},
    {  name: "kailash",        image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
    ]

app.get("/",function(req,res){
    res.render("landing");
})

app.get("/campgrounds",function(req,res){
 

        res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    
    var newcamp=req.body.campname;
    var newimage=req.body.campimage;
 
    var object={name:newcamp,image:newimage};

    campgrounds.push(object);

    res.redirect("/campgrounds");


});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
})
  
app.listen("7000",function(){
    console.log("yelpcamp is started");
})