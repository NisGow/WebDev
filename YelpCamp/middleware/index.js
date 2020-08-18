//all the middleware functions goes here
let middlewareObj = {};

let Campground = require("../models/campgrounds"),
	Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership= function(req,res,next){

	if(req.isAuthenticated()){
			
		Campground.findById(req.params.id,function(err, foundCampground){
			if(err){
				res.render("back");
			}else{
				//does user own the campground
				if(foundCampground.author.id.equals(req.user._id)){
				//render show templeate with that campground
				next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		 res.redirect("back")
	}
}
	



middlewareObj.checkCommentOwnership= function(req,res,next){

	if(req.isAuthenticated()){
			
		Comment.findById(req.params.comment_id,function(err, foundComment){
			if(err){
				res.render("back");
			}else{
				//does user own the comment
				if(foundComment.author.id.equals(req.user._id)){
				//render show templeate with that campground
				next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		 res.redirect("back")
	}
}
	
//middleware
middlewareObj.isLoggedIn=function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



module.exports = middlewareObj;