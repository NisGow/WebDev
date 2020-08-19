let express = require("express"),
 	router = express.Router(),
	Comment = require("../models/comment"),
	middleware = require("../middleware"),
	Campground= require("../models/campgrounds");


//use copy image address
//Index
router.get("/",function(req,res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(!err){
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	})
	
})

//Create - add new campgrounds
router.post("/",middleware.isLoggedIn,function(req,res){
	//get data from form and add to campgrounds arry
	let name =req.body.name
	let price = req.body.price
	let image = req.body.image
	let desc = req.body.description
	let author={
		id:req.user._id,
		username:req.user.username
	}
	let newCampground = {name:name ,price:price, image:image, description:desc, author:author, }
	
	//Create a new campground and save tp DB
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds
			console.log(newlyCreated);
			res.redirect("/campgrounds");		
		}
	});


});

//New - show form to create new campgounds
router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new")
});
	
//SHOW -shows more info about one campground
router.get("/:id", function(req, res){
	//Find campgrounds with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err||!foundCampground){
			req.flash("error","Campground not found");
			res.redirect("back")
		}else{
			//render show templeate with that campground
			res.render("campgrounds/show",{campground: foundCampground})
		}
	});
	
});

//Edit campground router
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
	//is user logged in 
	Campground.findById(req.params.id,function(err, foundCampground){
		res.render("campgrounds/edit",{campground: foundCampground})
	});
		
});

//update camground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the corrent camground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds")
		}else{
			res.redirect("/campgrounds/"+ updatedCampground._id);
		}
	});
	// redirect somewhere(show page)
});


//Destroy campground router
router.delete("/:id",middleware.checkCampgroundOwnership,async(req, res) => {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    res.redirect("/campgrounds");
  } catch (error) {
    console.log(error.message);
    res.redirect("/campgrounds");
  }
});

module.exports = router;