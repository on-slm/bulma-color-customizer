const mongoose = require('mongoose');
const moment = require('moment');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 100, trim: true }, // nickname
  first: { type: String, maxlength: 100, trim: true },
  last: { type: String, maxlength: 100, trim: true },
  email: {
    type: String,
    validate: {
      validator: function (val) {
        var re = /\S+@\S+\.\S+/;
        return re.test(val);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'User email required']
  },
  pass: { type: String, minlength: 6, maxlength: 100, required: true, trim: true },
  repo: { type: String, required: true, enum: ['Public', 'Private'], default: 'Private' },
  user_cookie_id: { type: String, required: true },
  last_logged: { type: Date, default: Date.now },
});

// virtual for generating users urls
UserSchema
  .virtual('url')
  .get(function() {
    return '/users/user/' + this._id; // virtual property of the model which uses the model instance's _id field to produce a unique URL path
  });

// virtual for url "alias" based on session ID
UserSchema
  .virtual('absolute_url')
  .get(function () {
    return '/users/' + this._id; // virtual property of the model which uses the model instance's _id field to produce a unique URL path
  });

UserSchema
  .virtual('fullname')
  .get(function () {
    return '' + this.first + ' ' + this.last;
  });

UserSchema
  .virtual('last_logged_formatted')
  .get(function () {
    return this.last_logged ? moment(this.last_logged).format('MMMM Do, YYYY') : 'N\/A';
  });

// !!! Declaring our URLs as a virtual in the schema is a good idea because then the URL for an item only ever needs to be changed in one place.

module.exports = mongoose.model('User', UserSchema);
