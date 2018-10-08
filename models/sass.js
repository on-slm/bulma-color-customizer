const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SassSchema = new Schema({
  name: String,
  labels: [{ type: Schema.Types.ObjectId, ref: 'SassLabel' }],
  code: {type: String, required: true},
  created: Date,
  downloadUrl: String,
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

SassSchema
.virtual('url')
.get( () => {
  return '/sasses/' + this._id; // this is BS. REWRITE later!
});

module.exports = mongoose.model('Sass', SassSchema);
