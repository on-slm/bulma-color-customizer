const express = require('express');
const async = require('async');

// primary model = labels of Csses
const CssLabel = require('../models/csslabel');
// ?? secondary model = css themselves
const Css = require('../models/css');

exports.css_label_list = function(req, res, next) {
  res.send('NOT IMPLEMENTED YET: list of all css labels');
};

exports.css_label_detail = function (req, res, next) {
  res.send('NOT IMPLEMENTED YET: display detail of single css label');
};

// display Css label create form on GET
exports.css_label_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display create form')
};

// handle Css label create form on POST
exports.css_label_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle create form')
};

// display Css label delete form on GET
exports.css_label_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display delete form')
};

// handle Css label delete form on POST
exports.css_label_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle delete form')
};

// display Css label update form on GET
exports.css_label_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display update form')
};

// handle Css label update form on POST
exports.css_label_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form')
};
