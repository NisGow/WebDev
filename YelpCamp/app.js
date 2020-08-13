let express = require("express");
let app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){
	let campgrounds = [
		{name: "Salmon Creek", image: " https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Granite Hill", image: " https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Salmon Creek", image: " https://unsplash.com/photos/qelGaL2OLyE"},
		
	]
	res.render("campgrounds", {campgrounds:campgrounds});
})
app
	
	.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("YelpCamp Has started ")
})