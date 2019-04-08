const express = require('express');
const router = express.Router();
const assignSessionID = require('../lib/asssignSessionID');
console.log('===================\n', 'index.js', '\n');

var arr = [];
var rdcer = (accum) => ++accum;

// GET main HP - it's not 'real' index page (it REDIRECTs to controller 'index' at /users/ (should be /users/user/:id))
router.get('/', function (req, res) {
  assignSessionID(req, __filename);

  res.redirect('/users');
 });


module.exports = router;
