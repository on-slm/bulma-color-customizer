const express = require('express');
const router = express.Router();

// GET main HP - it's not 'real' index page (it REDIRECTs to controller 'index' at /users/user/:id)
router.get('/', function (req, res) {
  console.log(`\nCKID: ${req.sessionID}`);
  console.log(`\nCKID2: ${req.session.id}`);
  console.log(`\nCKconnect.sid: ${req.cookies['connect.sid']}`);
  console.log(`\nCKreq.seesion.cookie: ${req.session.cookie}`);
  res.sendStatus(200);
  res.redirect('/users');
 });

module.exports = router;
