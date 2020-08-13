let express = require("express"),
 	app = express(),
 	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

//Schema Setup
let campgroundSchema = new mongoose.Schema({
	name:String,
	image: String
});

let Campground = mongoose.model("Campground", campgroundSchema);



let campgrounds = [
		{name: "Salmon Creek", image: " https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Granite Hill", image: " https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Salmon Creek", image: " https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	{name: "Salmon Creek", image: " https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Granite Hill", image: " https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Salmon Creek", image: " https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		
		
	]
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
})

//use copy image address
app.get("/campgrounds",function(req,res){
	
	res.render("campgrounds", {campgrounds:campgrounds});
})

app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds arry
	let name =req.body.name
	let image = req.body.image
	let newCampground = {name:name , image:image}
	campgrounds.push(newCampground)
	//redirect back to campgrounds
	res.redirect("/campgrounds");

});


app.get("/campgrounds/new", function(req, res){
	res.render("new")
})
	


app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("YelpCamp Has started ")
})