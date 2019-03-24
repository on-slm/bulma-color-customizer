const express = require('express');
const async = require('async');
const assignSessionID = require('../lib/asssignSessionID');

const Sass = require('../models/sass');

// display list of all sasses but in DB
exports.sass_list = function (req, res, next) {
  assignSessionID(req, __filename);
  Sass
    .find({}, 'name labels user created created_formatted')
    .populate('user')
    .populate('labels')
    .sort('name')
    .exec(function (err, list_sasses) {
      if (err) throw err;
      console.log(list_sasses);
      res.render('sass_list_all', {
        title: 'Color Customiser Sass list - sass_list',
        devSessionId: req.session.sessIdentity,
        devFilename: req.session.sessIdFirstAssign,
        error: err,
        sasslist: list_sasses
      });
    });
};

// display details for specific SASS code
exports.sass_detail = function (req, res, next) {
  assignSessionID(req, __filename);
  Sass
    .findById(req.params.id)
    .populate('user')
    .populate('labels')
    .exec(function (err, sassDetail) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (sassDetail == null) {
        var err = new Error('SASS not found');
        err.status = 404;
        return next(err);
      }
      console.log(sassDetail);
      res.render('sass/sass_detail', {
        title: 'SASS detail',
        devSessionId: req.session.sessIdentity,
        devFilename: req.session.sessIdFirstAssign,
        error: err,
        sass: sassDetail
      });
    });
};

// display Sass create form on GET
exports.sass_create_get = function (req, res, next) {
  assignSessionID(req, __filename);

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
  res.send('NOT IMPLEMENTED: handle delete form\n<br />(sass)');
};

// display Sass update form on GET
exports.sass_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display update form\n<br />(sass)');
};

// handle Sass update form on POST
exports.sass_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form\n<br />(sass)');
};
