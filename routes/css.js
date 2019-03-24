var express = require('express');
var router = express.Router();
var assignSessionID = require('../lib/asssignSessionID');

var css_controller = require('../controllers/cssController');

// CSS ROUTES
router.get('/css/create', css_controller.css_create_get); // not sure if needed on /users/, probably not

router.post('/css/create', css_controller.css_create_post); // not sure if needed on /users/, probably not

router.get('/css/:id/delete', css_controller.css_delete_get); // maybe... it depends on question: should an user be allowed to delete his csss from /users/ page (aka hp)?

router.post('/css/:id/delete', css_controller.css_delete_post); // maybe... it depends on question: should an user be allowed to delete his csss from /users/ page (aka hp)?

router.get('/css/:id/update', css_controller.css_update_get); // not sure if needed on /users/

router.post('/css/:id/update', css_controller.css_update_post); // dtto

router.get('/css/:id', css_controller.css_detail);

router.get('/list', css_controller.css_list); // currently it lists all css in db

module.exports = router;
