let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


//Schema Setup
let campgroundSchema = new mongoose.Schema({
	name:String,
	image: String,
	description: String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
	
});
const Comment = require('./comment');
campgroundSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});
module.exports = mongoose.model("Campground", campgroundSchema);