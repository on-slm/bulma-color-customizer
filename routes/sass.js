var express = require('express');
var router = express.Router();
var assignSessionID = require('../lib/asssignSessionID');

var sass_controller = require('../controllers/sassController');

// SaSS ROUTES
router.get('/sass/create', sass_controller.sass_create_get);

router.post('/sass/create', sass_controller.sass_create_post);

router.get('/sass/:id/delete', sass_controller.sass_delete_get);

router.post('/sass/:id/delete', sass_controller.sass_delete_post);

router.get('/sass/:id/update', sass_controller.sass_update_get);

router.post('/sass/:id/update', sass_controller.sass_update_post);

router.get('/sass/:id', sass_controller.sass_detail);

router.get('/list', sass_controller.sass_list); // lists all sass in db

module.exports = router;
