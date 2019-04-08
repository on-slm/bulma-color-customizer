var express = require('express');
var router = express.Router();
console.log('===================\n', 'users.js', '\n');

// values of properties of an object being passed to a view
// users count in last 7 days
var count = 0;
// TO DO: a counting logic for this variable

var user_controller = require('../controllers/userController');
var css_controller = require('../controllers/cssController');
var sass_controller = require('../controllers/sassController');
var label_controller = require('../controllers/labelController');

// catalog/ — The home/index page.
// = '/user' - The home/index page of an user = immediate redirect to /users/<user>/<id>

// router.get('/', user_controller.index);
router.get('/', user_controller.index);

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
// GET request to display detail of specific user profile
router.get('/user/:id', user_controller.user_detail);

// = /users/list - list of all users - BUDU MIT NAKONEC
router.get('/list', user_controller.users_list);

// = /users/<user>/<id>/update - the form to upadate users's details - basically only own custom name
// = /users/<user>/<id>/delete - the form to delete: 1. user and all its data (hned pak redirect na create), 2. del user's own custom name

module.exports = router;
