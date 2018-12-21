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

function boolRand() { return Math.floor(Math.random() * 2) };
var repValues = ['Public', 'Private'];

function createUser(nam, firs, las, emai, pas, rep, user_cookie_i, last_logge, casse, sasse, cb) {
  var userInfo = {
    name: nam,
    first: firs,
    last: las,
    email: emai,
    pass: pas,
    repo: rep[boolRand()],
    user_cookie_id: user_cookie_i,
    last_logged: last_logge,
    casses: casse,
    sasses: sasse
  };
  console.log('======================INFO===================');
  console.log('\n\n New user info: \n' + userInfo + '\n');
  for (const i in userInfo) {
    if (userInfo.hasOwnProperty(i)) {
      console.log(userInfo[i]);
    }
  }
  console.log('\n');



  var user = new User(userInfo);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('======================NEW USER===================');
    console.log('\n\n New user: \n' + user);
    console.log('\n');
    console.log('PUSHING INTO THE MAIN ARRAY - "users">');
    console.log('\n');
    users.push(user);
    cb(null, user);
  });
  // Object.values(userInfo).forEach(element => { console.log(element); });
}

/*
var name = random.firstname();
createUser(name.toLowerCase(), name, random.lastname(), random.email({ standard: true }), random.random(), repValues, random.random(), random.date(), random.array(), random.array(), callback);
*/


// IT THROWS ERROR BUT PERHAPS IT'S NOT CRUCIAL - LET IT BE...
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
        usrRandom.sss = random.array();
        console.log('----------------\n');
        console.log('usrRandom.sss : ' + usrRandom.sss);
        console.log('usrRandom.sss typeof: ' + (typeof usrRandom.sss) + '\n');
        usrRandom.sass = [];
        Object.values(usrRandom.sss).forEach(element => {
          console.log(element);
          usrRandom.sass.push(element);
        });
        console.log('usrRandom.sass typeof: ' + (typeof usrRandom.sass) + '\n');


        usrRandom.css = random.array();
        console.log('----------------\n');
        console.log('usrRandom.css : ' + usrRandom.css);
        console.log('usrRandom.css typeof: ' + (typeof usrRandom.css) + '\n');
        usrRandom.cstylesheet = [];
        Object.values(usrRandom.css).forEach(element => {
          console.log(element);
          usrRandom.cstylesheet.push(element);
        });
        console.log('usrRandom.cstylesheet typeof: ' + (typeof usrRandom.cstylesheet) + '\n');


        createUser(usrRandom.nick, usrRandom.name, usrRandom.lastname, usrRandom.email, usrRandom.password, usrRandom.repo, usrRandom.cookieId, usrRandom.logged, usrRandom.sass, usrRandom.cstylesheet, callback);
      },
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
        usrRandom.sss = random.array();
        console.log('----------------\n');
        console.log('usrRandom.sss : ' + usrRandom.sss);
        console.log('usrRandom.sss typeof: ' + (typeof usrRandom.sss) + '\n');
        usrRandom.sass = [];
        Object.values(usrRandom.sss).forEach(element => {
          console.log(element);
          usrRandom.sass.push(element);
        });

        usrRandom.css = random.array();
        console.log('----------------\n');
        console.log('usrRandom.css : ' + usrRandom.css);
        console.log('usrRandom.css typeof: ' + (typeof usrRandom.css) + '\n');
        usrRandom.cstylesheet = [];
        Object.values(usrRandom.css).forEach(element => {
          console.log(element);
          usrRandom.cstylesheet.push(element);
        });

        createUser(usrRandom.nick, usrRandom.name, usrRandom.lastname, usrRandom.email, usrRandom.password, usrRandom.repo, usrRandom.cookieId, usrRandom.logged, usrRandom.sass, usrRandom.cstylesheet, callback);
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
