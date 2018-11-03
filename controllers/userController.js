const express = require('express');


// main model = User
const User = require('../models/user');
// "secondary" models = User's own css and sass to list/del
const Css = require('../models/css');
const Sass = require('../models/sass');

const async = require('async');

// OBECNE TU PRIJDOU VSECHNY CRUD (budou-li potreba) OPERACE VC VYRENDROVANI PRO /users/:userId
// viz pokracilejsi https://expressjs.com/en/guide/routing.html

exports.index = function (req, res) {
  var sview;
  var sexp;
  if (req.session.views) {
    req.session.views++;
    sviews = req.session.views;
    sexp = (req.session.cookie.maxAge / 1000);
    console.log('\n sviews: ' + sviews, '\sexp: ' + sexp);
  } else {
    sviews = 1;
  }
  async.parallel({
    users_count: function (callback) {
      User.countDocuments({ repo: 'Private' }, callback);
    },
    css_count: function (callback) {
      Css.countDocuments({}, callback);
    },
    sass_count: function (callback) {
      Sass.countDocuments({}, callback);
    }
  }, function (err, results) {
    console.log('async\'s callback');
    res.render('users', {
      title: 'Color Customiser Homepage',
      error: err,
      data: results,
      containerStyle: flexBoxContainer,
      userlist: null,
      sessviews: sviews,
      sessexp:  sexp
    });
  });
};

// page listing all users
exports.users_list = function (req, res, next) {
  User.find({}, 'name repo last_logged')
    .populate('csses')
    .exec(function (err, listedusers) {
      if (err) { return next(err); }
      // succesful, so render:
      res.render('users', {
        title: 'Color Customiser Homepage',
        error: err,
        userlist: listedusers,
        containerStyle: flexBoxContainer,
        data: ''
      });
    });
};

// detail page for a specific profile
// (tyhlety exporty pak vlozit do app.get('/users/user/:userId', user_detail))
exports.user_detail = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
  // ...
  // findById
  // vyuzivat req.param.id
  // vytahnout z db vsechny relevantni informace
  // nakonec vyrendrovat s res.render (do objektu ty informace)
};

/*
SPATNY NAVRH DESIGNu - OPRAVA - toto pujde pod domain.cz/css[/list]
  // dale pokracovat napr. timto (VLOZIT DO app.get('/users/:userId/css/:cssId', list_user_css))
  exports.list_user_css = function(req, res, next) {
    aync // NUTNE POUZIT, JE TREBA HLEDAT VE DVOU KOLEKCICH
    // nejprve v User.function, pak v Css.function
    // atd
  }
*/

// display User create FORM on GET
exports.user_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User creat GET');
};

// HANDLE User create on POST
exports.user_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User create POST');
};

// display User delete FORM on GET
exports.user_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User delete GET');
};

// HANDLE User delete on POST
exports.user_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// display User update FORM on GET
exports.user_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User update GET');
};

// HANDLE User update on POST
exports.user_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// update some of user's info
// delete user from server (warn him, all css and sass will be lost)


var flexBoxContainer = {};
flexBoxContainer.width = '968px';
flexBoxContainer.height = '2500px';
flexBoxContainer['background-color'] = 'yellow';
flexBoxContainer.display = 'flex';
flexBoxContainer['flex-wrap'] = 'wrap';
flexBoxContainer['align-content'] = 'flex-start';
flexBoxContainer['align-items'] = 'flex-start';
flexBoxContainer['flex-direction'] = 'column';
flexBoxContainer['justify-content'] = 'center';
