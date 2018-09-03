const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  repo: { type: String, required: true, enum: ['Public', 'Private'], default: 'Private' },
  user_cookie_id: { type: String, required: true },
  last_logged: { type: Date, default: Date.now },
  sasses: [{ type: Schema.Types.ObjectId, ref: 'Sass' }],
  csses: [{ type: Schema.Types.ObjectId, ref: 'Css' }],
  absolute_url: String // asi pak jako virtual: '/route/' + this.user_cookie_id
});

// virtual for generating users urls
UserSchema
.virtual('url')
.get( () => {
  return '/users/' + this._id;
});

// !!! Declaring our URLs as a virtual in the schema is a good idea because then the URL for an item only ever needs to be changed in one place.

module.exports = mongoose.model('User', UserSchema);