var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource\n'); // TENTO CALLBACK ROVNA SE CONTROLLER
});

module.exports = router;


// catalog/ — The home/index page.
// = '/users/' - user's home page = hned forward na /users/<user>/<id>

// catalog/<objects>/ — The list of all books, bookinstances, genres, or authors (e.g. /catalog/books/, /catalog/genres/, etc.)
// = /users/<user> - list of all users - NEBUDU MIT

// catalog/<object>/<id> — The detail page for a specific book, bookinstance, genre, or author with the given _id field value (e.g. /catalog/book/584493c1f4887f06c0e67d37).
// = /users/<user>/<id> - detail page of current user 

// catalog/<object>/create — The form to create a new book, bookinstance, genre, or author (e.g. /catalog/book/create).
// = /users/<user>/create - sem hned redirect kdyz user zmackne cerveny button "delete my account and all its containing data"
// = /users/<user>/<id>/update - the form to upadate users's details - basically only own custom name 
// = /users/<user>/<id>/delete - the form to delete: 1. user and all its data (hned pak redirect na create), 2. del user's own custom name
