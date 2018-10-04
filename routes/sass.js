const express = require('express');
var router = express.Router;

// I didnt make separate route/file sasslabels.js/; it will be managed by this route, e.g of URL '/sass/labels', i.e. cssLabelcontrollers, e.g. list_sass_labels, sass_label_create_get etc

router.get('/', (req, res) => {
  // res.send ...= sass controller
})