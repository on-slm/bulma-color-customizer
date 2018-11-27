const express = require('express');
var router = express.Router;
const assignSessionID = require('../lib/asssignSessionID');

router.get('/', (req, res) => {
  assignSessionID(req, __filename);

  // res.send ... = css controller
});
