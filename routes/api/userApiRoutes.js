const express = require('express');
const router = express.Router();

var user_apicontroller = require('../../controllers/api/userApiController');

// full route: /api/users/create
router.post('/create', [
  user_apicontroller.insert
]);

router.get('/', [
  user_apicontroller.listUsers
]);

router.get('/:id', [
  user_apicontroller.getById
]);

router.patch('/:id', [
  user_apicontroller.patchById
]);

router.delete('/:id', [
  user_apicontroller.removeById
]);

module.exports = router;
