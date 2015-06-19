var mongoose = require('mongoose');
	URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

// schema

// define the data in our collection
var Item = new mongoose.Schema({

	name: String,
	cost: Number,
	
})
 
var Course = new mongoose.Schema({
	name: String,
	items: [Item],
	slug: String,
	
	


});

var User = mongoose.Schema({
	name:String,
	courses:[Course],
	isInstructor: Boolean,
	currentSlug: String 
});

var feedback = new mongoose.Schema({
	from:String,
	message:String
	

});



User.plugin(passportLocalMongoose);
// "register" it so that mongoose knows about it
mongoose.model('Course', Course);
mongoose.model('Item', Item);
mongoose.model('User', User);
mongoose.model('feedback', feedback);
module.exports = mongoose.model('User', User);

mongoose.connect('mongodb://localhost/gradebookdb');