const express = require('express');
const router = express.Router();

var arr = [];
var rdcer = (accum) => ++accum;


// GET main HP - it's not 'real' index page (it REDIRECTs to controller 'index' at /users/user/:id)
router.get('/', function (req, res) {
  console.log('' + 8 * '-');
  console.log(req.session.id);
  req.session.someAttribute = 'attribute';
  res.redirect('/users');
 });

module.exports = router;
