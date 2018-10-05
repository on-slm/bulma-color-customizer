var express = require('express');
var router = express.Router();

// GET homepage aka user detail (FIRST REDIRECT)
router.get('/', function (req, res) {
  res.redirect('/users');
});

module.exports = router;
