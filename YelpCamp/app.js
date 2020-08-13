let express = require("express"),
 	app = express(),
 	bodyParser = require("body-parser");

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//Schema Setup
let campgroundSchema = new mongoose.Schema({
	name:String,
	image: String,
	description: String
	
});

let Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create({
// 	name: "Salmon Creek", 
// 	image: " https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	description:"Huge granite hill"
// }, function(err,campground){
// 	if(!err){
// 		console.log("New campground");
// 		console.log(campground);
// 	}
// });


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
})

//use copy image address
//Index
app.get("/campgrounds",function(req,res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(!err){
			res.render("index", {campgrounds:allCampgrounds});
		}
	})
	
})

//Create - add new campgrounds
app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds arry
	let name =req.body.name
	let image = req.body.image
	let desc = req.body.description
	let newCampground = {name:name , image:image, description:desc}
	//Create a new campground and save tp DB
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds
			res.redirect("/campgrounds");		
		}
	});


});

//New - show form to create new campgounds
app.get("/campgrounds/new", function(req, res){
	res.render("new")
});
	
//SHOW -shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//Find campgrounds with provided ID
	Campground.findById(req.params.id,function(err, foundCampground){
		if(err){
			console.log(err)
		}else{
			//render show templeate with that campground
			res.render("show",{campground: foundCampground})
		}
	});
	
});

app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("YelpCamp Has started ")
})