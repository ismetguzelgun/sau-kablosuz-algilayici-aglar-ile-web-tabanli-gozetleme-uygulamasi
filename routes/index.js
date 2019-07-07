var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(passport){
	/* GET login page. */
	router.get('/', function(req, res) {
			// Display the Login page with any flash message, if any
		res.redirect('/login');
	});

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register', {message: req.flash('message') });
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

  /*/* GET home page. */
	router.get('/home', isAuthenticated, function(req, res) {
	    var db = req.db;
	    var collection = db.get('acceleration');

	    collection.find({},{sort: {time: -1}, limit : 6},function(e,docs){
	        //res.json(docs);
					res.render('home', {datas : docs, user : req.user, title : 'Ana Sayfa'});
	    });
	});

  router.get('/acc', isAuthenticated,function(req, res, next) {
    res.render('acc', { user : req.user, title : 'Akselerometre' });
  });

  /* GET Hello temp page. */
  router.get('/temp', isAuthenticated, function(req, res) {
      res.render('temp', { user : req.user, title : 'Sıcaklık' });
  });

  /* GET Hello temp page. */
  router.get('/battery', isAuthenticated,function(req, res) {
      res.render('battery', { user : req.user, title : 'Batarya' });
  });

	/*
	 * SİL
	 */
	router.delete('/sil', function(req, res) {
	    var db = req.db;
	    var collection = db.get('acceleration');
	   // var userToDelete = req.params.id;
	    collection.delete();
	});

	return router;
}
