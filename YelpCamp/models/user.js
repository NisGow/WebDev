let mongoose = require('mongoose');
let passportLocalMongoose = require("passport-local-mongoose")
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
 
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);