#! /usr/bin/env node

console.log('This script populates some test books, users, sasslabels and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');
// mongodb://127.0.0.1:27017/bulma_db
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var User = require('./models/user');
var Sass = require('./models/sass');
var Css = require('./models/css');
var SassLabel = require('./models/sasslabel');
var CssLabel = require('./models/csslabel');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var sasslabels = []
var sasses = []
var csses = []

var books = []
var bookinstances = []

// function authorCreate(name, user_cookie_id, last_log, repo, cb) {
//   authordetail = {name: name, user_cookie_id: user_cookie_id }
//   if (last_log != false) authordetail.last_logged = last_log
//   if (repo != false) authordetail.repo = repo;  
//   var user = new User(authordetail);
//   user.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New User: ' + user);
//     users.push(user)
//     cb(null, user)
//   }  );
// } // aka userCreate

// function genreCreate(label, cb) {
//   // aka sassLabelCreate
//   var sassLabel = new SassLabel({ label: label });
       
//   sassLabel.save(function (err) {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     console.log('New Sass Label: ' + sassLabel);
//     sasslabels.push(sassLabel)
//     cb(null, sassLabel);
//   }   );
// } // aka sassLabelCreate

// function bookCreate(name, code, downloadUrl, user, labels, cb) {
//   bookdetail = { 
//     name: name,
//     code: code,
//     user: user,
//     downloadUrl: downloadUrl
//   }
//   if (labels != false) bookdetail.labels = labels
    
//   var book = new Sass(bookdetail);    
//   book.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Sass: ' + book);
//     sasses.push(book)
//     cb(null, book)
//   }  );
// } // aka sassCreate

// function bookInstanceCreate(book, code, created, name, cb) {
//   bookinstancedetail = { 
//     user: book, // tohle musim referovat na Usera!!!
//     code: code
//   }    
//   if (created != false) bookinstancedetail.created = created
//   if (name != false) bookinstancedetail.name = name
    
//   var bookinstance = new Css(bookinstancedetail);    
//   bookinstance.save(function (err) {
//     if (err) {
//       console.log('ERROR CREATING Css: ' + bookinstance);
//       cb(err, null)
//       return
//     }
//     console.log('New Css: ' + bookinstance);
//     csses.push(bookinstance)
//     cb(null, bookinstance) // TADY JE V PUVODNIM KODU CHYBA - NAPSAT NA GITHUB
//   }  );
// } // aka cssCreate

// function createGenreAuthors(cb) {
//     async.parallel([
//         function(callback) {
//           authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
//         },
//         function(callback) {
//           authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
//         },
//         function(callback) {
//           authorCreate('Isaac', 'Asimov', '1920-01-02', 'Public', callback);
//         },
//         function(callback) {
//           authorCreate('Bob', 'Billings', false, false, callback);
//         },
//         function(callback) {
//           authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
//         },
//         function(callback) {
//           genreCreate("Fantasy", callback);
//         },
//         function(callback) {
//           genreCreate("Science Fiction", callback);
//         },
//         function(callback) {
//           genreCreate("French Poetry", callback);
//         },
//         ],
//         // optional callback
//         cb);
// } // aka Users and SassLabels

// function createBooks(cb) {
//     async.parallel([
//         function(callback) {
//           bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', users[0], [sasslabels[0],], callback);
//         },
//         function(callback) {
//           bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', users[0], [sasslabels[0],], callback);
//         },
//         function(callback) {
//           bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', users[0], [sasslabels[0],], callback);
//         },
//         function(callback) {
//           bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', users[1], [sasslabels[1],], callback);
//         },
//         function(callback) {
//           bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', users[1], [sasslabels[1],], callback);
//         },
//         function(callback) {
//           bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', users[4], [sasslabels[0],sasslabels[1]], callback);
//         },
//         function(callback) {
//           bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', users[4], false, callback)
//         }
//         ],
//         // optional callback
//         cb);
// } // aka sassCreate


//  function createBookInstances(cb) {
//      async.parallel([
//          function(callback) {
//            bookInstanceCreate(users[0], 'London Gollancz, 2014.', false, 'Available', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[1], ' Gollancz, 2011.', false, 'Loaned', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[0], ' Gollancz, 2015.', false, false, callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[0], 'Imprint XXX2', false, false, callback)
//          },
//          function(callback) {
//            bookInstanceCreate(users[1], 'Imprint XXX3', false, false, callback)
//          }
//          ],
//          // Optional callback
//          cb);
//  } // aka cssCreate



// async.series([
//     createGenreAuthors,
//     createBooks,
//     createBookInstances
// ],
// // Optional callback
// function(err, results) {
//     if (err) {
//         console.log('FINAL ERR: '+err);
//     }
//     else {
//         console.log('BOOKInstances: '+csses);
        
//     }
//     // All done, disconnect from database
//     mongoose.connection.close();
// });



 function authorCreate(name, user_cookie_id, last_log, repo, sasses, csses, cb) {
   authordetail =   {
                    name: name, 
                    user_cookie_id: user_cookie_id,
                    sasses: sasses,
                    csses: csses
                    }
   if (last_log != false) authordetail.last_logged = last_log
   if (repo != false) authordetail.repo = repo;  
   var user = new User(authordetail);
   user.save(function (err) {
     if (err) {
       cb(err, null)
       return
     }
     console.log('New User: ' + user);
     users.push(user)
     cb(null, user)
   }  );
 } // aka userCreate


 function createAdditionalUsers(cb) {
   async.parallel(
     [
      (callback) => {
        authorCreate('Ondrej Salamon', 'SAL001', new Date(), 'Public', [sasses[0]], [csses[0], csses[1]], callback);
      },
      (callback) => {
        authorCreate('Tomas Akvinsky', 'AQV001', new Date(), 'Private', [sasses[1], sasses[2]], [csses[2]], callback);
      }
     ],
   cb);
 }

 function bookInstanceCreate(book, code, created, name, cb) {
   bookinstancedetail = { 
     user: book,  //tohle musim referovat na Usera!!!
     code: code
   }    
   if (created != false) bookinstancedetail.created = created
   if (name != false) bookinstancedetail.name = name
    
   var bookinstance = new Css(bookinstancedetail);    
   bookinstance.save(function (err) {
     if (err) {
       console.log('ERROR CREATING Css: ' + bookinstance);
       cb(err, null)
       return
     }
     console.log('New Css: ' + bookinstance);
     csses.push(bookinstance);
     cb(null, bookinstance); // TADY JE V PUVODNIM KODU CHYBA - NAPSAT NA GITHUB
   }  );
 } // aka cssCreate


 function bookInstance2Create(book, code, created, name, cb) {
  bookinstancedetail = { 
    user: book,  //tohle musim referovat na Usera!!!
    code: code
  }    
  if (created != false) bookinstancedetail.created = created
  if (name != false) bookinstancedetail.name = name
   
  var bookinstance = new Css(bookinstancedetail);    
  bookinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Css: ' + bookinstance);
      cb(err, null)
      return
    }
    console.log('New Css: ' + bookinstance);
    sasses.push(bookinstance);
    cb(null, bookinstance); // TADY JE V PUVODNIM KODU CHYBA - NAPSAT NA GITHUB
  }  );
} // aka cssCreate

   function createAdditionalBookInstancesAkaCss(cb) {
      async.parallel([
          function(callback) {
            bookInstanceCreate(users[0], '{ font-size: 2em }', Date.now(), 'My CSS 1', callback)
          },
          function(callback) {
            bookInstanceCreate(users[0], '{\n background: blue \n}', Date.now(), 'My CSS 2', callback)
          },
          function(callback) {
            bookInstanceCreate(users[1], '{\n background: black \n}', Date.now(), 'Akvin CSS 1', callback)
          }
          ],
          // Optional callback
          cb);
  } // aka cssCreate

  function createAdditionalBookInstancesAkaSasses(cb) {
    async.parallel([
        function(callback) {
          bookInstance2Create(users[0], '{ SOME SASS CODE; font-size: 2em }', Date.now(), 'My sass 1', callback)
        },
        function(callback) {
          bookInstance2Create(users[1], '{\n SOME SASS CODE2; background: blue \n}', Date.now(), 'AKVIn sass1', callback)
        },
        function(callback) {
          bookInstance2Create(users[1], '{\n SOME SASS CODE3; background: black \n}', Date.now(), 'Akvin sass2', callback)
        }
        ],
        // Optional callback
        cb);
} // aka sassCreate


 async.series([
    createAdditionalUsers,
     createAdditionalBookInstancesAkaCss,
     createAdditionalBookInstancesAkaSasses
 ],
 // Optional callback
 function(err, results) {
     if (err) {
         console.log('FINAL ERR: '+err);
     }
     else {
         console.log('csess: '+csses);
       
     }
     // All done, disconnect from database
     mongoose.connection.close();
 });