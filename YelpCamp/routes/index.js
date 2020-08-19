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
			return res.render("register", {"error": err.message});
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
		});
	});
});


//show login form
router.get("/login", function(req, res){
	res.render("login");
})
//handle login logic
//use middleware for login 
router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});
//logout routes
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success","logged you out");
	res.redirect("/campgrounds");
})






module.exports = router;