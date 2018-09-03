const express = require('express');
const async = require('async');

// primary models = User's own sass and sass to list/del
const Sass = require('../models/sass');

// secondary model = User
const User = require('../models/user');

// display list of user's sasses 
exports.list_users_sass = function(req, res, next) {
  res.send('NOT IMPLEMENTED: list of users themselves codes');
};

// display details for specific SASS code 
exports.sass_detail = function(req, res, next) {
  res.send('NOT IMPLEMENTED: list of users sasses codes');
}

// display Sass create form on GET
exports.sass_create_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: display create form')
}

// handle Sass create form on POST
exports.sass_create_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: handle create form')
}

// display Sass delete form on GET
exports.sass_delete_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: display delete form')
}

// handle Sass delete form on POST
exports.sass_delete_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: handle delete form')
}

// display Sass update form on GET
exports.sass_update_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: display update form')
}

// handle Sass update form on POST
exports.sass_update_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form')
}

