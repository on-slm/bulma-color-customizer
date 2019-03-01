#! /usr/bin/env node

// console.log('This script populates some test users, csses/sasses and css/sass labels to database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');
// mongodb://127.0.0.1:27017/color_customizer_db
// Get arguments passed on command line
/*
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}
*/
var async = require('async');
var random = require('random-world');
const express = require('express');
const router = express.Router();
const assignSessionID = require('./lib/asssignSessionID');
var User = require('./models/user');
var Sass = require('./models/sass');
var Css = require('./models/css');
var SassLabel = require('./models/sasslabel');
var CssLabel = require('./models/csslabel');

/*
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB (' + userArgs[0] + ') connection error:'));
*/

// LASTLY I'VE READ: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Using_models >> Working with related documents — population

var users = [];
var sasses = [];
var sasslabels = [];
var labels = [];
var csses = [];
var csslabels = [];

function boolRand() { return Math.floor(Math.random() * 2); }
var repValues = ['Public', 'Private'];

// User + SassLabel + CssLabel - every item wiht ASYNC.SERIES
// User
function userCreate(nam, firs, las, emai, pas, rep, user_cookie_i, last_logge, cb) {
  var userInfo = {
    name: nam,
    first: firs,
    last: las,
    email: emai,
    pass: pas,
    repo: rep[boolRand()],
    user_cookie_id: user_cookie_i,
    last_logged: last_logge
  };
  console.log('USER OBJECT START ============');
  Object.values(userInfo).forEach(el => { console.log(el); });
  console.log('USER OBJECT END   ============');

  var user = new User(userInfo);
  console.log(user);
  console.log('\n');

  user.save(function (err) {
    if (err) {
      console.log('Error while saving created User (Mongoose): \n' + err);
      cb(err, null);
      return;
    }
    console.log('New User: \n' + user);
    users.push(user);
    cb(null, user);
  });
}

function createUsersTest(cb) {
  async.parallel(
    [
      (callback) => {
        var usrRandom = {};
        var name = random.firstname();
        usrRandom.nick = name.toLowerCase();
        usrRandom.name = name;
        usrRandom.lastname = random.lastname();
        usrRandom.email = random.email({ standard: true });
        usrRandom.password = random.random();
        usrRandom.repo = repValues;
        usrRandom.cookieId = random.random();
        usrRandom.logged = random.date();

        userCreate(usrRandom.nick, usrRandom.name, usrRandom.lastname, usrRandom.email, usrRandom.password, usrRandom.repo, usrRandom.cookieId, usrRandom.logged, callback);
      }
    ],
  cb);
}

// Label
function labelCreate(lbl, cb) {
  var label = lbl;
  console.log('LABEL VAR START ==========\n' + label + '\nLABEL VAR END   ==========');

  var labelInstance = new SassLabel({ label: label });
  console.log(labelInstance);
  console.log('\n\n');

  labelInstance.save(function (err) {
    if (err) {
      console.log('Error while saving created labelInstance (Mongoose): \n' + err);
      console.log('\n\n');
      cb(err, null);
      return;
    }
    console.log('New labelInstance: \n' + labelInstance);
    console.log('\n\n');
    labels.push(labelInstance);
    cb(null, labelInstance);
  });
}

function createLabelTest(cb) {
  async.parallel([
    function(callback) {
      var labelRandom = random.word();

      labelCreate(labelRandom, callback);
    }
  ],
  cb);
}


// Css + Sass - both AFTER all users and labels and each item ASYNC.PARALLEL
function cssCreate(nam, lbls, cod, create, dwnldUrl, use, cb) {
  var cssObject = {
    name: nam,
    labels: [].push(lbls[0]),
    code: cod,
    created: create,
    downloadUrl: dwnldUrl,
    user: [].push(use[0])
  };
  console.log('CSS OBJECT START ============');
  Object.values(cssObject).forEach(el => { console.log(el); });
  console.log('CSS OBJECT END   ============');

  var cssInstance = new Css(cssObject);
  console.log(cssInstance);
  console.log('\n');

  cssInstance.save(function (err) {
    if (err) {
      console.log('Error while saving created cssInstance (Mongoose): \n' + err);
      console.log('\n\n');
      cb(err, null);
      return;
    }
    console.log('New Css: \n' + cssInstance);
    console.log('\n\n');
    csses.push(cssInstance);
    cb(null, cssInstance);
  });
}

function createCssTest(cb) {
  async.parallel(
    [
      function (callback) {
        var cssRandom = {};
        cssRandom.name = random.lastname();
        cssRandom.labels = labels;
        cssRandom.code = random.sentence();
        cssRandom.created = new Date();
        cssRandom.downloadUrl = random.domain();
        cssRandom.user = users;

        cssCreate(cssRandom.name, cssRandom.labels, cssRandom.code, cssRandom.created, cssRandom.downloadUrl, cssRandom.user, callback);
      }
    ],
  cb);
}

// CssLabel
/*
function cssLabelCreate(lbl, cb) {
  var cssLbl = lbl;
  console.log('CSSLABEL VAR START ==========\n' + cssLbl + '\nCSSLABEL VAR END   ==========');

  var cssLabel = new SassLabel({
    label: cssLbl
  });
  console.log(cssLabel);
  console.log('\n\n');

  cssLabel.save(function (err) {
    if (err) {
      console.log('Error while saving created SassLabel (Mongoose): \n' + err);
      console.log('\n\n');
      cb(err, null);
      return;
    }
    console.log('New CssLabel: \n' + cssLabel);
    console.log('\n\n');
    csslabels.push(cssLabel);
    cb(null, cssLabel);
  });
}

function createCssLabelTest(cb) {
  async.parallel([
      function (callback) {
        var labelRandom = random.word();

        cssLabelCreate(labelRandom, callback);
      }
    ],
    cb);
}
*/

/*
function sassCreate(nam, lbls, cod, create, dwnldUrl, use, cb) {
  var sassInfo = {
    name: nam,
    labels: lbls,
    code: cod,
    created: create,
    downloadUrl: dwnldUrl,
    user: use
  };
  Object.values(sassInfo).forEach(el => { console.log(el); });
  console.log('\n');

  var sass = new Sass(sassInfo);
  Object.values(sass).forEach(el => { console.log(el); });
  console.log('\n');

  sass.save(function (err) {
    if (err) {
      console.log('Error while saving created Sass (Mongoose): \n' + err);
      cb(err, null);
      return;
    }
    console.log('New Sass: \n' + sass);
    sasses.push(sass);
    cb(null, sass);
  });
}

function createSassTest(cb) {
  async.parallel([
    (callback) => {
      var sassRandm = {};
    }
  ],
  cb);
}
*/


// testing only:
async.parallel([
  createUsersTest,
  createLabelTest,
  createCssTest
],
  function (err, results) {
    if (err) {
      console.log('\n\n logging error of async series: \n\n');
      console.error(err);
    } else {
      console.log('\n\n logging result of async series: \n\n');
      // console.log(users);
      console.log(labels);
    }
  }
);
