const express = require('express');
const router = express.Router();

var user_apicontroller = require('../../controllers/api/userApiController');

// full route: /api/users/create
router.post('/create', user_apicontroller.insert);

module.exports = router;
