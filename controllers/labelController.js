const express = require('express');
const async = require('async');
const assignSessionID = require('../lib/asssignSessionID');

const Label = require('../models/label');
const Css = require('../models/css');
const Sass = require('../models/sass');

// display list of all labels
exports.label_list = function (req, res, next) {
  assignSessionID(req, __filename);
  Label.find()
    .populate('')
    .sort('label')
    .exec(function (err, list_labels) {
      if (err) { return next(err); }
      console.log(list_labels);
      res.render('labels_list_all', {
        title: 'List of labels (\'labels_list_all\')',
        devSessionId: req.session.sessIdentity,
        devFilename: req.session.sessIdFirstAssign,
        error: err,
        labelslist: list_labels
      });
    });
};

// Display detail page for a specific Label.
exports.label_detail = function (req, res, next) {
  assignSessionID(req, __filename);

  async.parallel({
    label: function (callback) {
      Label
        .findById(req.params.id)
        .exec(callback);
    },
    label_css: function (callback) {
      Css
        .find({ 'labels': req.params.id })
        .populate('user')
        .exec(callback);
    },
    label_sass: function (callback) {
      Sass
        .find({ 'labels': req.params.id })
        .populate('user')
        .exec(callback);
    }
  },
    function (err, results) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (results.label == null) {
        var err = new Error('Label not found');
        err.status = 404;
        return next(err);
      }
      console.log(results);
      res.render('label/label_detail', {
        title: 'Label details',
        devSessionId: req.session.sessIdentity,
        devFilename: req.session.sessIdFirstAssign,
        error: err,
        label: results.label,
        css: results.label_css,
        sass: results.label_sass
      });
    });
  };

// display label create form on GET
exports.label_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display create form');
};

// handle label create form on POST
exports.label_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle create form');
};

// display label delete form on GET
exports.label_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display delete form');
};

// handle label delete form on POST
exports.label_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle delete form');
};

// display label update form on GET
exports.label_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display update form');
};

// handle label update form on POST
exports.label_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form');
};
