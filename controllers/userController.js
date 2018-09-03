const express = require('express');
const async = require('async');
// main model = User
const User = require('../models/user');

// secondary models = User's own css and sass to list/del
const Css = require('../models/css');
const Sass = require('../models/sass');

// 1.7.2018 23:56 TADY POKRACOVAT, NEUVAZOVAT NAD TIM:

// OBECNE TU PRIJDOU VSECHNY CRUD (budou-li potreba) OPERACE VC VYRENDROVANI PRO /users/:userId
// viz pokracilejsi https://expressjs.com/en/guide/routing.html


// oproti ostatnim controllerum tady bude navic index() funkce, tj. zobrazeni site welcome page
// fakticky pujde o merge zobrazeni funkci "list_users_css" a "list_users_sass"
exports.index = function(req, res) {
  res.send('NOT YET IMPLEMENTED: site home page');
}

// list user profile
// (tyhlety exporty pak vlozit do app.get('/users/:userId', list_user_details))
exports.user_detail = function(req, res, next) {
  res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
  // ... 
  // findById
  // vyuzivat req.param.id
  // vytahnout z db vsechny relevantni informace
  // nakonec vyrendrovat s res.render (do objektu ty informace)
}

/* SPATNY NAVRH DESIGNu - OPRAVA - toto pujde pod domain.cz/css[/list]
  // dale pokracovat napr. timto (VLOZIT DO app.get('/users/:userId/css/:cssId', list_user_css))
  exports.list_user_css = function(req, res, next) {
    aync // NUTNE POUZIT, JE TREBA HLEDAT VE DVOU KOLEKCICH
    // nejprve v User.function, pak v Css.function
    // atd
  }
*/

// display User create FORM on GET
exports.user_create_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: User creat GET');
}

// HANDLE User create on POST
exports.user_create_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: User create POST');
}

// display User delete FORM on GET
exports.user_delete_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: User delete GET');
}

// HANDLE User delete on POST
exports.user_delete_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: User delete POST');
}

// display User update FORM on GET
exports.user_update_get = function(req, res, next) {
  res.send('NOT IMPLEMENTED: User update GET');
}

// HANDLE User update on POST
exports.user_update_post = function(req, res, next) {
  res.send('NOT IMPLEMENTED: User delete POST');
}


// update some of user's info


// delete user from server (warn him, all css and sass will be lost)


// ???