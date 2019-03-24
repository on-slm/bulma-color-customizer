var express = require('express');
var router = express.Router();
var assignSessionID = require('../lib/asssignSessionID');

var sass_controller = require('../controllers/sassController');

// SaSS ROUTES
router.get('/sass/create', sass_controller.sass_create_get); // not sure if needed on /users/, probably not

router.post('/sass/create', sass_controller.sass_create_post); // not sure if needed on /users/, probably not

router.get('/sass/:id/delete', sass_controller.sass_delete_get); // maybe... it depends on question: should an user be allowed to delete his sasss from /users/ page (aka hp)?

router.post('/sass/:id/delete', sass_controller.sass_delete_post); // maybe... it depends on question: should an user be allowed to delete his sasss from /users/ page (aka hp)?

router.get('/sass/:id/update', sass_controller.sass_update_get); // not sure if needed on /users/

router.post('/sass/:id/update', sass_controller.sass_update_post); // dtto

router.get('/sass/:id', sass_controller.sass_detail);

router.get('/list', sass_controller.sass_list); // currently it lists all css in db

module.exports = router;
