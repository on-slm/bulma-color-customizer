const express = require('express');
const async = require('async');
const assignSessionID = require('../common/asssignSessionID');
console.log('===================\n', 'userController.js', '\n');

// main model = User
const User = require('../models/user');
// "secondary" models = User's own css and sass to list/del
const Css = require('../models/css');
const Sass = require('../models/sass');
const Label = require('../models/label');

// OBECNE TU PRIJDOU VSECHNY CRUD (budou-li potreba) OPERACE VC VYRENDROVANI PRO /users/:userId
// viz pokracilejsi https://expressjs.com/en/guide/routing.html
exports.index = function (req, res, next) {
  assignSessionID(req, __filename);

    // TODO logic for a user-specific view counter (and other places) - viz app.js l.132
  async.parallel({
    users_count: function (callback) {
      User.countDocuments({}, callback);
    },
    privrepo_count: function (callback) {
      User.countDocuments({ repo: 'Private' }, callback);
    },
    css_count: function (callback) {
      Css.countDocuments({}, callback);
    },
    sass_count: function (callback) {
      Sass.countDocuments({}, callback);
    }
  }, function (err, results) {
    console.log(results);
    res.render('user/users', {
      title: 'Color Customiser Homepage - index',
      devSessionId: req.session.sessIdentity,
      devFilename: req.session.sessIdFirstAssign,
      error: err,
      data: results,
      userlist: null,
      sessviews: null,  // TODO (again) counter
      sessexp:  null    // dtto
    });
  });
};

// page listing all users (aka router.get('/list', user_controller.users_list);) aka URL /users/list
exports.users_list = function (req, res, next) {
  assignSessionID(req, __filename);

  async.parallel({
    users_count: function (callback) {
      User.countDocuments({}, callback);
    },
    privrepo_count: function (callback) {
      User.countDocuments({ repo: 'Private' }, callback);
    },
    css_count: function (callback) {
      Css.countDocuments({}, callback);
    },
    sass_count: function (callback) {
      Sass.countDocuments({}, callback);
    },
    users: function (callback) {
      User.find({ /* name: 'Ondrej Salamon' */ }, 'name last_logged repo')
        .populate('csses')
        .sort({ last_logged: 'asc' })   // or 'descending'
        .exec(callback);
    }
  }, function (err, results) {
    if (err) {
      console.error(err);
      return next(err);
    }
    console.log(results);
    results.users.forEach(function (el) {
      console.log(el.url);
    });
    res.render('user/users', {
      title: 'Color Customiser Homepage - user_list',
      devSessionId: req.session.sessIdentity,
      devFilename: req.session.sessIdFirstAssign,
      error: err,
      userlist: results.users,
      data: results,
      sessionId: req.session.sessIdentity
    });
  });
};

// detail page for a specific profile
// (tyhlety exporty pak vlozit do app.get('/users/user/:userId', user_detail))
exports.user_detail = function (req, res, next) {
  assignSessionID(req, __filename);

  async.parallel(
    {
      user: function(callback) {
        User
          .findById(req.params.id)
          .exec(callback);
      },
      user_csses: function(callback) {
        Css
          .find({ 'user': req.params.id }, 'name code labels')
          .populate('labels')
          .exec(callback);
      },
      user_sasses: function (callback) {
        Sass
          .find({ 'user': req.params.id }, 'name code labels')
          .populate('labels')
          .exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (results.user == null) {
        var err = new Error('User not found');
        err.status = 404;
        return next(err);
      }
      console.log(results);
      res.render('user/user_detail', {
        title: 'User profile',
        devSessionId: req.session.sessIdentity,
        devFilename: req.session.sessIdFirstAssign,
        error: err,
        user: results.user,
        csses: results.user_csses,
        sasses: results.user_sasses
      });
    });
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
  assignSessionID(req, __filename);

  res.send('NOT IMPLEMENTED: User creat GET');
};

// HANDLE User create on POST
exports.user_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User create POST');
};

// display User delete FORM on GET
exports.user_delete_get = function (req, res, next) {
  assignSessionID(req, __filename);

  res.send('NOT IMPLEMENTED: User delete GET');
};

// HANDLE User delete on POST
exports.user_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// display User update FORM on GET
exports.user_update_get = function (req, res, next) {
  assignSessionID(req, __filename);

  res.send('NOT IMPLEMENTED: User update GET');
};

// HANDLE User update on POST
exports.user_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// update some of user's info
// delete user from server (warn him, all css and sass will be lost)
