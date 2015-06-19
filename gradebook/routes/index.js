var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Item = mongoose.model('Item');
var feedback = mongoose.model('feedback');




/* GET home page. */
router.get('/', function(req, res) {
 
  res.render('index');

});


router.get('/feedback', function(req, res) {
 
  res.render('feedback');

});
/* GET Feedback page. */
router.post('/feedback', function(req, res) {
 console.log(req.body);
  var newFeedback = feedback({
		from: req.body.email,
	 	message: req.body.userName,
		

	 });
  console.log(newFeedback);
newFeedback.save(function(err,list,count){
		console.log('error', err);
		res.redirect('/index'); 
	});


});


/* GET list of courses page. */
router.get('/list', function(req, res) {
	

	test = req.user.courses;

	res.render('list', {'test':test});
 
});


router.get('/list/create', function(req, res) {
  res.render('create', { title: 'Create a new Course' });


});

router.post('/list/create',function(req,res){
	var newCourse = Course({
		name: req.body.name,
		createdBy: req.body.userName,
		items: [],
		

	});
	
	newCourse.slug = newCourse.name.replace(" ", "");


	req.user.courses.push(newCourse);
	req.user.currentName = newCourse.name; 
	
	




	
	req.user.save(function(err,list,count){
		console.log('error', err);

		res.redirect('/list'); 
	});

	});


router.get('/login', function(req, res) {

	res.render('login');
	
  
});

router.get('/maps', function(req, res) {

	
	res.render('maps');


	
});

router.post('/login', function(req,res,next) {

  passport.authenticate('local', function(err,user) {
    
    if(user) {
      // NOTE: using this version of authenticate requires us to
      // call login manually
      req.logIn(user, function(err) {
        res.redirect('/users/' + user.username);
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
  // NOTE: notice that this form of authenticate returns a function that
  // we call immediately! See custom callback section of docs:
  // http://passportjs.org/guide/authenticate/
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username, name:req.body.name }), 
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send messagesge back to registration...
      console.log("error", err);
      res.render('register',{message:'Your username or password is already taken'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
       console.log("calling authenticate");
      passport.authenticate('local')(req, res, function() {
      
        res.redirect('/users/' + req.user.username);
        
      });
    }
  });

});

router.get('/users/:username', function(req, res) {

 
     
    res.render('user', { 
     
      username: req.user.username,
      user: req.user

});
    


});





router.get('/list/create', function(req, res) {
  res.render('create', { title: 'Add a new Course' });
});









router.get('/maps', function(req, res) {
	res.render('maps');	
});


router.get('/list/:slug', function(req, res) {
	var stuff = String(this.URL); 
	console.log(req.params.slug);
	
	
	if(req.user.username===('jjv222')){
		console.log("yes");
		req.user.isInstructor = true;
    }
    var temp = req.user.isInstructor;
	console.log(temp);
	res.render('items',{'temp':temp});
	
});
	
router.post('/list/:slug', function(req, res){
	console.log("At the post");
	var newItems = new Item({
		name: req.body.name,
		cost: req.body.cost,
		
	});
	
	console.log(newItems);
	console.log("Here")
	for(var i =0; i<req.user.courses.length;i++){
		if(req.user.courses[i].slug==req.params.slug){
			
			req.user.courses[i].items.push(newItems);
		}
		console.log(req.user.courses[i].slug);
		console.log(req.params.slug);	
		var items=req.user.courses[i].items
	}
	
	
	console.log(items);
	console.log("Here 2")
	req.user.save(function(err,list,count){
		console.log('error', err);
		var temp = req.user.isInstructor;
		res.render('items',{'items':items,'temp':temp});
	});
	
});









	
module.exports = router;

    

	

	



	



