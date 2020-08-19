let express = require("express"),
 	router = express.Router({mergeParams:true}),
	Comment = require("../models/comment"),
	middleware = require("../middleware"),
	Campground= require("../models/campgrounds");


router.get("/new",middleware.isLoggedIn,function(req,res){
	//find campground by id
	Campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err)
		}else{
			//render show templeate with that campground
			res.render("comments/new",{campground: campground})
		}
	});
})

router.post("/", middleware.isLoggedIn,function(req,res){
	//lookup campground using ID
	//connect comment to campground
	//redirect campground show page
	//Create a new campground and save tp DB
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					//add username and ID to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save()
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added comment!");
					res.redirect("/campgrounds/" + campground._id)
				}
			})
		}
	});
});
//comment edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			req.flash("error","Campground not found");
			return res.redirect("back");
		}else{
			Comment.findById(req.params.comment_id,function(err, foundComment){
			if(err){
				req.flash("error","Comment not found");
				res.redirect("back")
			}else{
				res.render("comments/edit", {campground_id:req.params.id, comment:foundComment})
			}	
			})
		}
	})
})
//comment update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})
//Comment destroy
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	//findbyId and remove
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back")
		}else{
			req.flash("success","Successfully deleted comment!");
			res.redirect("/campgrounds/" +req.params.id );
		}
	})
})



module.exports = router;