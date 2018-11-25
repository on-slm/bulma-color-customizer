const express = require('express');
const async = require('async');
console.log('===================\n', 'userController.js', '\n');

// main model = User
const User = require('../models/user');
// "secondary" models = User's own css and sass to list/del
const Css = require('../models/css');
const Sass = require('../models/sass');

// OBECNE TU PRIJDOU VSECHNY CRUD (budou-li potreba) OPERACE VC VYRENDROVANI PRO /users/:userId
// viz pokracilejsi https://expressjs.com/en/guide/routing.html
exports.index = function (req, res) {
  if (req.session.sessIdentity == undefined) {
    req.session.sessIdFirstAssign = __filename.replace(process.cwd(), '');
    req.session.sessIdentity = req.session.id;
  }
  console.log('', __filename.replace(process.cwd(), ''), '\'s session ID: ', req.session.sessIdentity, '\n', '(ID was assined in: ', req.session.sessIdFirstAssign.replace(process.cwd(), ''), ')\n');
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
    res.render('users', {
      title: 'Color Customiser Homepage - index',
      devSessionId: req.session.sessIdentity,
      devFilename: req.session.sessIdFirstAssign,
      error: err,
      data: results,
      containerStyle: flexBoxContainer,   // remove
      userlist: null,
      sessviews: null,  // TODO (again) counter
      sessexp:  null    // dtto
    });
  });
};

// page listing all users (aka router.get('/list', user_controller.users_list);) aka URL /users/list
exports.users_list = function (req, res, next) {
  if (req.session.sessIdentity == undefined) {
    req.session.sessIdFirstAssign = __filename.replace(process.cwd(), '');
    req.session.sessIdentity = req.session.id;
  }
  console.log('', __filename.replace(process.cwd(), ''), '\'s session ID: ', req.session.sessIdentity, '\n', '(ID was assined in: ', req.session.sessIdFirstAssign.replace(process.cwd(), ''), ')\n');

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
      User.find({ name: 'Ondrej Salamon' }, 'name last_logged csses')
        .populate('csses')
        .exec(callback);
    }
  }, function (err, results) {
    console.log(results);
    results.users.forEach(function (el) {
      console.log(el.url);
    });
    res.render('users', {
      title: 'Color Customiser Homepage - user_list',
      devSessionId: req.session.sessIdentity,
      devFilename: req.session.sessIdFirstAssign,
      error: err,
      userlist: results.users,
      data: results,
      containerStyle: flexBoxContainer,
      sessionId: req.session.sessIdentity
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
