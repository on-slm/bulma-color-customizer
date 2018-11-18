const express = require('express');
var router = express.Router;

router.get('/', (req, res) => {
  console.log('>>> ', __filename, '\'s session ID: ', req.session.sessIdentity, '\n');
  // res.send ... = css controller
})
