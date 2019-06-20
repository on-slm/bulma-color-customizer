const express = require('express');
const router = express.Router();
const permissions = require('../../common/config/envConfig').permissionLevels;

const PUBLIC = permissions.PUBLIC;
const USER = permissions.USER;
const ADMIN = permissions.ADMIN;

var user_apicontroller = require('../../controllers/api/userApiController');

var validation_middleware = require('../../common/middleware/validationMiddleware');
var permission_required_middleware = require('../../common/middleware/permissionMiddleware');

// full route: /api/users/create
router.post('/create', [
  user_apicontroller.insert
]);

router.get('/', [
  validation_middleware.validJWTNeeded,
  permission_required_middleware.minimumPermissionLevelRequired(USER),
  user_apicontroller.listUsers
]);

router.get('/:id', [
  validation_middleware.validJWTNeeded,
  permission_required_middleware.minimumPermissionLevelRequired(PUBLIC),
  user_apicontroller.getById
]);

router.patch('/:id', [
  validation_middleware.validJWTNeeded,
  permission_required_middleware.minimumPermissionLevelRequired(USER),
  user_apicontroller.patchById
]);

router.delete('/:id', [
  validation_middleware.validJWTNeeded,
  permission_required_middleware.minimumPermissionLevelRequired(ADMIN),
  user_apicontroller.removeById
]);

module.exports = router;
