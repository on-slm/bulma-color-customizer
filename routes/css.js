const express = require('express');
var router = express.Router;

// I didnt make separate route/file csslabels.js/; it will be managed by this route, e.g of URL '/css/labels', i.e. cssLabelcontrollers, e.g. list_css_labels, css_label_create_get etc

router.get('/', (req, res) => {
  // res.send ... = css controller
})