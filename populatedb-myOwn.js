#! /usr/bin/env node

console.log('This script populates some test users, csses/sasses and css/sass labels to database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');
// mongodb://127.0.0.1:27017/color_customizer_db
// Get arguments passed on command line
/*
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}
*/

var random = require('random-world');
const express = require('express');
const router = express.Router();
const assignSessionID = require('./lib/asssignSessionID');
var User = require('./models/user');
var Sass = require('./models/sass');
var Css = require('./models/css');
var SassLabel = require('./models/sasslabel');
var CssLabel = require('./models/csslabel');
var async = require('async');

/*
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB (' + userArgs[0] + ') connection error:'));
*/

var users = [];
var sasses = [];
var sasslabels = [];
var csses = [];
var csslabels = [];

function boolRand() { return Math.floor(Math.random() * 2); }
var repValues = ['Public', 'Private'];

function userCreate(nam, firs, las, emai, pas, rep, user_cookie_i, last_logge, casse, sasse, cb) {
  var userInfo = {
    name: nam,
    first: firs,
    last: las,
    email: emai,
    pass: pas,
    repo: rep[boolRand()],
    user_cookie_id: user_cookie_i,
    last_logged: last_logge,
    csses: casse,
    sasses: sasse
  };
  Object.values(userInfo).forEach(el => { console.log(el); });
  console.log('\n');

  var user = new User(userInfo);
  Object.values(user).forEach(el => { console.log(el); });
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
        usrRandom.sass = random.array();
        usrRandom.cstylesheet = random.array();

        userCreate(usrRandom.nick, usrRandom.name, usrRandom.lastname, usrRandom.email, usrRandom.password, usrRandom.repo, usrRandom.cookieId, usrRandom.logged, usrRandom.sass, usrRandom.cstylesheet, callback);
      }
    ],
  cb);
}

async.series([
  createUsersTest,
  createUsersTest
],
  function (err, results) {
    if (err) console.error(err);
    console.log(users);
  }
);

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
