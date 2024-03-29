const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 100, trim: true }, // nickname
  first: { type: String, maxlength: 100, trim: true },
  last: { type: String, maxlength: 100, trim: true },
  email: {
    type: String,
    validate: {
      validator: function (val) {
        return new Promise(function (resolve, reject) {
          var re = /\S+@\S+\.\S+/;
          var isValid = re.test(val);
          if (err) {
            reject(err);
          } else {
            resolve(`EMAIL:: ${val} is valid.`);
          }
        });
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'User email required']
  },
  pass: { type: String, minlength: 6, maxlength: 200, trim: true },
  repo: { type: String, enum: ['Public', 'Private'], default: 'Private' },
  user_cookie_id: { type: String },
  last_logged: { type: Date, default: Date.now }
});

// later added to the model for the REST API
UserSchema.add({
  permissionLevel: Number
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

module.exports = mongoose.model('User', UserSchema);
