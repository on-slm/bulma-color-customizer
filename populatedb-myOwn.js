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

function createUser(nam, firs, las, emai, pas, rep, user_cookie_i, last_logge, casse, sasse) {
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
  console.log(userInfo);
  // Object.values(userInfo).forEach(element => { console.log(element); });
}

// var name = random.firstname();
// createUser(name.toLowerCase(), name, random.lastname(), random.email({ standard: true }), random.random(), repValues, random.random(), random.date(), random.array(), random.array());
