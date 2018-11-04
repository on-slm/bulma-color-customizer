const express = require('express');
const router = express.Router();

// GET main HP - it's not 'real' index page (it REDIRECTs to controller 'index' at /users/user/:id)
router.get('/', function (req, res) {



  res.sendStatus(200);
  // res.redirect('/users');
 });

module.exports = router;
