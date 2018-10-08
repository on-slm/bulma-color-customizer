const express = require('express');
const async = require('async');

// primary models = User's own sass and sass to list/del
const Sass = require('../models/sass');

// secondary model = User
const User = require('../models/user');

// display list of user's sasses
exports.sass_list = function(req, res, next) {
  res.send('NOT IMPLEMENTED: list of user\'s sass codes\n<br />(sass)');
};

// display details for specific SASS code
exports.sass_detail = function (req, res, next) {
  res.send('NOT IMPLEMENTED: detail of a specific css code: ' + req.params.id + '\n<br />(sass)');
};

// display Sass create form on GET
exports.sass_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display create form\n<br />(sass)');
};

// handle Sass create form on POST
exports.sass_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle create form\n<br />(sass)');
};

// display Sass delete form on GET
exports.sass_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display delete form\n<br />(sass)');
};

// handle Sass delete form on POST
exports.sass_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle delete form\n<br />(sass)')
};

// display Sass update form on GET
exports.sass_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display update form\n<br />(sass)');
};

// handle Sass update form on POST
exports.sass_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form\n<br />(sass)');
};
