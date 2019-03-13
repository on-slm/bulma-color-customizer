const express = require('express');
const async = require('async');
const assignSessionID = require('../lib/asssignSessionID');

const Css = require('../models/css');

// display list of all csses in DBs
exports.css_list = function (req, res, next) {
  assignSessionID(req, __filename);

  Css.find({}, 'name labels user created created_formatted')
    .populate('user')
    .populate('labels')
    .sort('name')
    .exec(function (err, list_csses) {
      if (err) throw err;
      console.log(list_csses);
      res.render('css_list_all', {
        title: 'Color Customiser Css list - css_list',
        devSessionId: req.session.sessIdentity,
        devFilename: req.session.sessIdFirstAssign,
        error: err,
        csslist: list_csses
      });
    });
};

// display details for specific CSS code
exports.css_detail = function (req, res, next) {
  assignSessionID(req, __filename);

  res.send('NOT IMPLEMENTED: detail of a specific css code: ' + req.params.id + '\n<br />(css)');
};

// display Css create form on GET
exports.css_create_get = function (req, res, next) {
  assignSessionID(req, __filename);

  res.send('NOT IMPLEMENTED: display create form\n<br />(css)');
};

// handle Css create form on POST
exports.css_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle create form\n<br />(css)');
};

// display Css delete form on GET
exports.css_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: display delete form\n<br />(css)');
};

// handle Css delete form on POST
exports.css_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle delete form\n<br />(css)');
};

// display Css update form on GET
exports.css_update_get = function (req, res, next) {
  assignSessionID(req, __filename);

  res.send('NOT IMPLEMENTED: display update form\n<br />(css)');
};

// handle Css update form on POST
exports.css_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: handle update form\n<br />(css)');
};
