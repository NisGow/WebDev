let express = require("express"),
 	app = express(),
	Campground= require("./models/campgrounds"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride= require("method-override"),
	flash= require("connect-flash"),
	Comment = require("./models/comment"),
 	bodyParser = require("body-parser"),
	User = require("./models/user"),
	seedDB = require("./seeds");

//route files
let commentRoutes= require("./routes/comments"),
	campgroundRoutes= require("./routes/campgrounds"),
	indexRoutes= require("./routes/index")



let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());


app.use(require("express-session")({
		secret:"UT austin bevo hookem202020200",
		resave: false,
		saveUninitialized:false
	}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//sends user info to all routes
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");

   next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("YelpCamp Has started ")
})