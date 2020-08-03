var mongoose=require("mongoose");

var campgrounds=require("./models/campgrounds");
var Comment=require("./models/Comments")
var data=[
    {
        name:"mussoorie",
        image:"https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"hello great"

    },
    {
        name:"mussoorie",
        image:"https://images.pexels.com/photos/414122/pexels-photo-414122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"hello great"

    },
    {
        name:"mussoorie",
        image:"https://images.pexels.com/photos/414122/pexels-photo-414122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"hello great"

    }
]

function seed(){
    campgrounds.remove({},function(err){
        if(err)
        console.log(err)
    
        console.log("all camgrounds are removed");
    });


    data.forEach(function(camps){
        campgrounds.create(camps,function(err,returned_camp){
            if(err)
            console.log(err)
            
            else 
            {
                console.log(returned_camp)
                Comment.create({
                   
                        text:"this place is  great.but expensive .",
                        author:"JOHN WICK"
                    },function(err,returned_comment){
                        if(err)
                        console.log(err)

                        else
                        {
                            returned_camp.comments.push(returned_comment);
                            returned_camp.save();
                            console.log("a new comment is added");
                        }

                    
                });
            }
            

        })
    })

}

module.exports=seed;
