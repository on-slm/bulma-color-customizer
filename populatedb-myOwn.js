#! /usr/bin/env node
var async = require('async');
var random = require('random-world');
const express = require('express');
const router = express.Router();
const assignSessionID = require('./lib/asssignSessionID');
var User = require('./models/user');
var Sass = require('./models/sass');
var Css = require('./models/css');
var Label = require('./models/label');

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://onslm:telefon5@bcustomizer-tn0cj.mongodb.net/bcc_db?retryWrites=true';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB (' + mongoDB + ') connection error:'));

var users = [];
var sasses = [];
var csses = [];
var labels = [];

function boolRand() { return Math.floor(Math.random() * 2); }
function threeRand() { return Math.floor(Math.random() * 3); }
function twentyFiveRand() { return Math.floor(Math.random() * 25); }
var repValues = ['Public', 'Private'];

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
  var user = new User(userInfo);
  console.log(user + '\n');

  user.save(function (err) {
    if (err) {
      console.log('Error while saving created User (Mongoose): \n' + err);
      cb(err, null);
      return;
    }
    console.log('New User: \n' + user + '\n\n');
    users.push(user);
    cb(null, user);
  });
}

// TODO rewrite with "that one" ES6 syntax... and others similar below
function randomUser() {
  var usrRandom = {};
  var name = random.firstname();
  usrRandom.nick = name.toLowerCase();
  usrRandom.name = name;
  usrRandom.lastname = random.lastname();
  usrRandom.email = random.email({
    standard: true
  });
  usrRandom.password = random.random();
  usrRandom.repo = repValues;
  usrRandom.cookieId = random.random();
  usrRandom.logged = random.date();
  return usrRandom;
}

function createUsersTest(cb) {
  async.series(
    [
      function(callback) {
        var usrRandom = randomUser();
        userCreate(usrRandom.nick, usrRandom.name, usrRandom.lastname, usrRandom.email, usrRandom.password, usrRandom.repo, usrRandom.cookieId, usrRandom.logged, callback);
      },
      function (callback) {
        var usrRandom = randomUser();
        userCreate(usrRandom.nick, usrRandom.name, usrRandom.lastname, usrRandom.email, usrRandom.password, usrRandom.repo, usrRandom.cookieId, usrRandom.logged, callback);
      },
      function (callback) {
        var usrRandom = randomUser();
        userCreate(usrRandom.nick, usrRandom.name, usrRandom.lastname, usrRandom.email, usrRandom.password, usrRandom.repo, usrRandom.cookieId, usrRandom.logged, callback);
      }
    ],
  cb);
}

// Label
function labelCreate(lbl, cb) {
  var label = lbl;
  console.log('LABEL VAR START ==========\n' + label + '\nLABEL VAR END   ==========');

  var labelInstance = new Label({ label: label });
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
  async.series([
    function(callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function(callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    },
    function (callback) {
      var labelRandom = random.word();
      labelCreate(labelRandom, callback);
    }
  ],
  cb);
}

// Css
function cssCreate(nam, lbls, cod, create, dwnldUrl, use, cb) {
  var cssObject = {
    name: nam,
    labels: lbls,
    code: cod,
    created: create,
    downloadUrl: dwnldUrl,
    user: use
  };
  var cssInstance = new Css(cssObject);
  console.log(cssInstance + '\n');

  cssInstance.save(function (err) {
    if (err) {
      console.log('Error while saving created cssInstance (Mongoose): \n' + err + '\n\n');
      cb(err, null);
      return;
    }
    console.log('New Css: \n' + cssInstance + '\n\n');
    csses.push(cssInstance);
    cb(null, cssInstance);
  });
}

function randomCss() {
  var cssRandom = {};
  cssRandom.name = random.lastname();
  cssRandom.code = random.sentence();
  cssRandom.created = new Date();
  cssRandom.downloadUrl = random.domain();
  return cssRandom;
}

function createCssTest(cb) {
  async.parallel(
    [
      function (callback) {
        var cssRandom = randomCss();
        cssCreate(cssRandom.name, [labels[twentyFiveRand()], labels[twentyFiveRand()], labels[twentyFiveRand()], ], cssRandom.code, cssRandom.created, cssRandom.downloadUrl, users[threeRand()], callback);
      },
      function (callback) {
        var cssRandom = randomCss();
        cssCreate(cssRandom.name, [labels[twentyFiveRand()], ], cssRandom.code, cssRandom.created, cssRandom.downloadUrl, users[threeRand()], callback);
      },
      function (callback) {
        var cssRandom = randomCss();
        cssCreate(cssRandom.name, [], cssRandom.code, cssRandom.created, cssRandom.downloadUrl, users[threeRand()], callback);
      },
      function (callback) {
        var cssRandom = randomCss();
        cssCreate(cssRandom.name, [labels[twentyFiveRand()], labels[twentyFiveRand()], labels[twentyFiveRand()], labels[twentyFiveRand()], labels[twentyFiveRand()], ], cssRandom.code, cssRandom.created, cssRandom.downloadUrl, users[threeRand()], callback);
      },
      function (callback) {
        var cssRandom = randomCss();
        cssCreate(cssRandom.name, [labels[twentyFiveRand()], labels[twentyFiveRand()], ], cssRandom.code, cssRandom.created, cssRandom.downloadUrl, users[threeRand()], callback);
      },
      function (callback) {
        var cssRandom = randomCss();
        cssCreate(cssRandom.name, [labels[twentyFiveRand()], labels[twentyFiveRand()], ], cssRandom.code, cssRandom.created, cssRandom.downloadUrl, users[threeRand()], callback);
      },
    ],
  cb);
}

// Sass
function sassCreate(nam, lbls, cod, create, dwnldUrl, use, cb) {
  var sassObject = {
    name: nam,
    labels: lbls,
    code: cod,
    created: create,
    downloadUrl: dwnldUrl,
    user: use
  };
  var sassInstance = new Sass(sassObject);
  console.log(sassInstance, '\n');

  sassInstance.save(function (err) {
    if (err) {
      console.log('Error while saving created cssInstance (Mongoose): \n' + err + '\n\n');
      cb(err, null);
      return;
    }
    console.log('New Sass: \n' + sassInstance + '\n\n');
    sasses.push(sassInstance);
    cb(null, sassInstance);
  });
}

function randomSass() {
  var sassRandom = {};
  sassRandom.name = random.lastname();
  sassRandom.code = random.sentence();
  sassRandom.created = new Date();
  sassRandom.downloadUrl = random.domain();
  return sassRandom;
}

function createSassTest(cb) {
  async.parallel(
    [
      function (callback) {
        var sassRandom = randomSass();
        sassCreate(sassRandom.name, [labels[twentyFiveRand()], labels[twentyFiveRand()], labels[twentyFiveRand()], ], sassRandom.code, sassRandom.created, sassRandom.downloadUrl, users[0], callback);
      },
      function (callback) {
        var sassRandom = randomSass();
        sassCreate(sassRandom.name, [labels[twentyFiveRand()], ], sassRandom.code, sassRandom.created, sassRandom.downloadUrl, users[1], callback);
      },
      function (callback) {
        var sassRandom = randomSass();
        sassCreate(sassRandom.name, [], sassRandom.code, sassRandom.created, sassRandom.downloadUrl, users[2], callback);
      }
    ],
    cb);
}

async.series([
  createUsersTest,
  createLabelTest,
  createCssTest,
  createSassTest
  ],
  function (err, results) {
    if (err) {
      console.log('\n\n logging error of async series: \n\n');
      console.error(err);
    } else {
      console.log('\n\n logging result of async series: \n\n');
      console.log(users);
      console.log(labels);
    }
  }
);

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

// MongoDB Atlas - full driver example
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://onslm:<password>@bcustomizer-tn0cj.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

// MongoDB Atlas - connection string only
/*
mongodb+srv://onslm:telefon5@bcustomizer-tn0cj.mongodb.net/test01?retryWrites=true
*/
