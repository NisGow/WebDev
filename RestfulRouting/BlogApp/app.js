let express = require("express"),
	app = express(),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	bodyParser = require("body-parser");
	


let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//App config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//Mongoose /Model Config
let blogsSchema = new mongoose.Schema({
	title:String,
	image: String,
	body: String,
	created:{type:Date, default:Date.now}
	
});

let Blog = mongoose.model("Blog", blogsSchema);

//Restful Routes

app.get("/",function(req, res){
	res.redirect("/blogs");
})

//Index route
app.get("/blogs",function(req, res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("error")
		}else{
			res.render("index", {blogs:blogs});
		}
	})
	
})

// new route
app.get("/blogs/new",function(req, res){
	res.render("new");
})

//Create route
app.post("/blogs",function(req, res){
	//create blogs
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new")
		}else{
			res.redirect("/blogs");
		}
	})
	//then redirect to the index
})

//Show route
app.get("/blogs/:id",function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs")
		}else{
			res.render("show",{blog:foundBlog});
		}
	})
})

//Edit route
app.get("/blogs/:id/edit",function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs")
		}else{
			res.render("edit",{blog:foundBlog});
		}
	})
})
	
	
//update route
app.put("/blogs/:id",function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs")
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	})
})
//Delete Route
app.delete("/blogs/:id",function(req, res){
	//Destroy blog
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs")
		}else{
			res.redirect("/blogs/");
		}
	})
})


app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("Server is running")
})