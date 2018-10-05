const express = require('express');
const async = require('async');

// NEEDS COMPLETE REVISION [2018-10-04] - DONE

// primary models = User's own css and sass to list/del
const Css = require('../models/css');
// secondary model = User
const User = require('../models/user'); // not sure if needed


// display list of (user's) csses
exports.css_list = function(req, res, next) {
  res.send('NOT IMPLEMENTED: list of users themselves codes');
};

// display details for specific CSS code
exports.css_detail = function(req, res, next) {
  res.send('NOT IMPLEMENTED: list of users csses codes');
}

// display Css create form on GET
exports.css_create_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: display create form')
}

// handle Css create form on POST
exports.css_create_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: handle create form')
}

// display Css delete form on GET
exports.css_delete_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: display delete form')
}

// handle Css delete form on POST
exports.css_delete_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: handle delete form')
}

// display Css update form on GET
exports.css_update_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: display update form')
}

// handle Css update form on POST
exports.css_update_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form')
}
