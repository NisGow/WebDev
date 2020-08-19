//all the middleware functions goes here
let middlewareObj = {};

let Campground = require("../models/campgrounds"),
	Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership= function(req,res,next){

	if(req.isAuthenticated()){
			
		Campground.findById(req.params.id,function(err, foundCampground){
			if(err||!foundCampground){
				req.flash("error","Campground not found");
				res.render("back");
			}else{
				//does user own the campground
				if(foundCampground.author.id.equals(req.user._id)){
				//render show templeate with that campground
				next();
				}else{
					req.flash("error","You do not have permission to do that!");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to be logged in to do that!");
		 res.redirect("back")
	}
}
	



middlewareObj.checkCommentOwnership= function(req,res,next){

	if(req.isAuthenticated()){
			
		Comment.findById(req.params.comment_id,function(err, foundComment){
			if(err|| !foundComment){
				req.flash("error","Comment not found");
				res.render("back");
			}else{
				//does user own the comment
				if(foundComment.author.id.equals(req.user._id)){
				//render show templeate with that campground
				next();
				}else{
					req.flash("error","You do not have permission to do that!");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to be logged in to do that!");
		 res.redirect("back")
	}
}
	
//middleware
middlewareObj.isLoggedIn=function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that!");
	res.redirect("/login");
}



module.exports = middlewareObj;