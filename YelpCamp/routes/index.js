let express = require("express"),
 	router = express.Router(),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	User = require("../models/user"),
	Comment = require("../models/comment"),
	Campground= require("../models/campgrounds");


//root routes
router.get("/",function(req,res){
	res.render("landing");
})



//show register form
router.get("/register", function(req, res){
	res.render("register");
})
//handle sign up logic
router.post("/register",function(req,res){
	let newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds")
		})
	})
});


//show login form
router.get("/login", function(req, res){
	res.render("login");
})
//handle login logic
//use middleware for login 
router.post("/login",passport.authenticate("local",{
	//middleware
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}), function(req,res){
	
});

//logout routes
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
})



function isLoggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;