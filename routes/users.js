var express = require('express');
var router = express.Router();

// for user details page all 5 controllers are needed
var user_controller = require('../controllers/userController');
var css_controller = require('../controllers/cssController');
var sass_controller = require('../controllers/sassController');
var sass_label_controller = require('../controllers/sassLabelController');
var css_label_controller = require('../controllers/cssLabelController');

// catalog/ — The home/index page.
// = '/user' - The home/index page of an user = immediate redirect to /users/<user>/<id>

router.get('/', user_controller.index); // TO DO: EDIT, MUST IMMEDIATELY REDIRECT TO GET [users]/<user>/<id>

// GET request for creating a User profile (All these "creates" must come before routes displaying what was created; obviously)
router.get('/user/create', user_controller.user_create_get);

// POST request for creating User profile...
router.post('/user/create', user_controller.user_create_post);

// GET delete
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST delete
router.post('/user/:id/delete', user_controller.user_delete_post);

// GET update
router.get('/user/:id/update', user_controller.user_update_get);

// POST update
router.post('/user/:id/update', user_controller.user_update_get);

// [catalog]/<object>/<id> — The detail page for a specific book, bookinstance, genre, or author with the given _id field value (e.g. /catalog/book/584493c1f4887f06c0e67d37).
// GET request to display user profile/detail
router.get('/user/:id');

// catalog/<objects>/ — The list of all books, bookinstances, genres, or authors (e.g. /catalog/books/, /catalog/genres/, etc.)
// = /users - list of all users - NEBUDU MIT
// NO: router.get('/users', user_controller.user_list);

// catalog/<object>/create — The form to create a new book, bookinstance, genre, or author (e.g. /catalog/book/create).
// = /users/<user>/create - sem hned redirect kdyz user zmackne cerveny button "delete my account and all its containing data"
// = /users/<user>/<id>/update - the form to upadate users's details - basically only own custom name
// = /users/<user>/<id>/delete - the form to delete: 1. user and all its data (hned pak redirect na create), 2. del user's own custom name

// CSS ROUTES

router.get('/css/create', css_controller.css_create_get); // not sure if needed on /users/

router.post('/css/create', css_controller.css_create_post); // not sure if needed on /users/

router.get('/css/:id/delete', css_controller.css_delete_get); // maybe - should an user be allowed to delete his csss from /users/ page (aka hp)?

router.post('/css/:id/delete', css_controller.css_delete_post); // maybe - should an user be allowed to delete his csss from /users/ page (aka hp)?

router.get('/css/:id/update', css_controller.css_update_get); // not sure if needed on /users/

router.post('/css/:id/update', css_controller.css_update_post); // dtto

router.get('/css/:id', css_controller.css_detail);

router.get('/csses', css_controller.css_list);



module.exports = router;
