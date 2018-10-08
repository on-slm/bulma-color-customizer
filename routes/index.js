var express = require('express');
var router = express.Router();

// GET main HP - it's not 'real' index page (it REDIRECTs to controller 'index' at /users/user/:id)
router.get('/', function (req, res) {
  res.redirect('/users');
});

module.exports = router;
