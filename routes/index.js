const express = require('express');
const router = express.Router();
console.log('===================\n', 'index.js', '\n');

var arr = [];
var rdcer = (accum) => ++accum;

// GET main HP - it's not 'real' index page (it REDIRECTs to controller 'index' at /users/user/:id)
router.get('/', function (req, res) {
  if (req.session.sessIdentity == undefined) {
    req.session.sessIdFirstAssign = __filename.replace(process.cwd(), '');
    req.session.sessIdentity = req.session.id;
  }
  console.log('', __filename.replace(process.cwd(), ''), '\'s session ID: ', req.session.sessIdentity, '\n', '(ID was assined in: ', req.session.sessIdFirstAssign.replace(process.cwd(), ''), ')\n');
  res.redirect('/users');
 });


module.exports = router;
