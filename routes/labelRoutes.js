var express = require('express');
var router = express.Router();
var assignSessionID = require('../lib/asssignSessionID');

var label_controller = require('../controllers/labelController');

// LABEL ROUTES
router.get('/label/create', label_controller.label_create_get);

router.post('/label/create', label_controller.label_create_post);

router.get('/label/:id/delete', label_controller.label_delete_get);

router.post('/label/:id/delete', label_controller.label_delete_post);

router.get('/label/:id/update', label_controller.label_update_get);

router.post('/label/:id/update', label_controller.label_update_post);

router.get('/label/:id', label_controller.label_detail);

router.get('/list', label_controller.label_list); // lists all labels in db

module.exports = router;
