// TODO remove this file
const express = require('express');
const async = require('async');

const CssLabel = require('../models/csslabel');
const Css = require('../models/css');

// MERDE - there's no csslabels collection, only sasslabels
exports.css_label_list = function (req, res, next) {
  res.send('WON\'T BE IMPLEMENTED AT ALL');
  /*
  CssLabel.find()
    .populate('')
    .sort('label')
    .exec(function (err, list_csslabels) {
      if (err) { return next(err); }
      console.log(list_csslabels);
      res.render('csslabels_list_all', {
        title: 'Color Customiser CSSlabels list - csslabels_list_all',
        devSessionId: req.session.sessIdentity,
        devFilename: req.session.sessIdFirstAssign,
        error: err,
        csslabelslist: list_csslabels
      });
    });
    */
};

exports.css_label_detail = function (req, res, next) {
  res.send('WON\'T BE IMPLEMENTED AT ALL');
};

// display Css label create form on GET
exports.css_label_create_get = function (req, res, next) {
  res.send('WON\'T BE IMPLEMENTED AT ALL');
};

// handle Css label create form on POST
exports.css_label_create_post = function (req, res, next) {
  res.send('WON\'T BE IMPLEMENTED AT ALL');
};

// display Css label delete form on GET
exports.css_label_delete_get = function (req, res, next) {
  res.send('WON\'T BE IMPLEMENTED AT ALL');
};

// handle Css label delete form on POST
exports.css_label_delete_post = function (req, res, next) {
  res.send('WON\'T BE IMPLEMENTED AT ALL');
};

// display Css label update form on GET
exports.css_label_update_get = function (req, res, next) {
  res.send('WON\'T BE IMPLEMENTED AT ALL');
};

// handle Css label update form on POST
exports.css_label_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form');
};
