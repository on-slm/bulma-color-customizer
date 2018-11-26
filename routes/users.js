var express = require('express');
var router = express.Router();
console.log('===================\n', 'users.js', '\n');


// values of properties of an object being passed to a view
// users count in last 7 days
var count = 0;
// TO DO: a counting logic for this variable

// for user details page all 5 controllers are needed
var user_controller = require('../controllers/userController');
var css_controller = require('../controllers/cssController');
var sass_controller = require('../controllers/sassController');
var sass_label_controller = require('../controllers/sassLabelController');
var css_label_controller = require('../controllers/cssLabelController');

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

// CSS ROUTES

router.get('/css/create', css_controller.css_create_get); // not sure if needed on /users/, probably not

router.post('/css/create', css_controller.css_create_post); // not sure if needed on /users/, probably not

router.get('/css/:id/delete', css_controller.css_delete_get); // maybe... it depends on question: should an user be allowed to delete his csss from /users/ page (aka hp)?

router.post('/css/:id/delete', css_controller.css_delete_post); // maybe... it depends on question: should an user be allowed to delete his csss from /users/ page (aka hp)?

router.get('/css/:id/update', css_controller.css_update_get); // not sure if needed on /users/

router.post('/css/:id/update', css_controller.css_update_post); // dtto

router.get('/css/:id', css_controller.css_detail);

router.get('/csses', css_controller.css_list); // currently it lists all css in db

// SaSS ROUTES

router.get('/sass/create', sass_controller.sass_create_get); // not sure if needed on /users/, probably not

router.post('/sass/create', sass_controller.sass_create_post); // not sure if needed on /users/, probably not

router.get('/sass/:id/delete', sass_controller.sass_delete_get); // maybe... it depends on question: should an user be allowed to delete his sasss from /users/ page (aka hp)?

router.post('/sass/:id/delete', sass_controller.sass_delete_post); // maybe... it depends on question: should an user be allowed to delete his sasss from /users/ page (aka hp)?

router.get('/sass/:id/update', sass_controller.sass_update_get); // not sure if needed on /users/

router.post('/sass/:id/update', sass_controller.sass_update_post); // dtto

router.get('/sass/:id', sass_controller.sass_detail);

router.get('/sasses', sass_controller.sass_list); // currently it lists all css in db

// CSS LABELS ROUTES

router.get('/csslabel/create', css_label_controller.css_label_create_get); // probably not needed here

router.post('/csslabel/create', css_label_controller.css_label_create_post); // probably not needed here

router.get('/csslbael/:id/delete', css_label_controller.css_label_delete_get); // certainly not needed here on /users/ route

router.post('/csslabel/:id/delete', css_label_controller.css_label_delete_post); // dtto

router.get('/csslabel/:id/update', css_label_controller.css_label_update_get); // dtto

router.post('/csslabel/:id/update', css_label_controller.css_label_update_post); // dtto

router.get('/csslabel/:id', css_label_controller.css_label_detail); // dont know

router.get('/csslabels', css_label_controller.css_label_list); // probably yes


// SaSS LABELS ROUTES

router.get('/sasslabel/create', sass_label_controller.sass_label_create_get); // probably not needed here

router.post('/sasslabel/create', sass_label_controller.sass_label_create_post); // probably not needed here

router.get('/sasslbael/:id/delete', sass_label_controller.sass_label_delete_get); // certainly not needed here on /users/ route

router.post('/sasslabel/:id/delete', sass_label_controller.sass_label_delete_post); // dtto

router.get('/sasslabel/:id/update', sass_label_controller.sass_label_update_get); // dtto

router.post('/sasslabel/:id/update', sass_label_controller.sass_label_update_post); // dtto

router.get('/sasslabel/:id', sass_label_controller.sass_label_detail); // dont know

router.get('/sasslabels', sass_label_controller.sass_label_list); // probably yes


module.exports = router;
