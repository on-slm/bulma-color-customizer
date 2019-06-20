const express = require('express');
const router = express.Router();

var auth_apicontroller = require('../../controllers/api/authApiController');
var verify_user_middleware = require('../../authorization/middleware/userVerifyMiddleware');

router.post('/auth', [
  // WTF??? VerifyUserMiddleware.hasAuthValidFields,
  verify_user_middleware.isPasswordMatchedUser,
  auth_apicontroller.login
]);

module.exports = router;
