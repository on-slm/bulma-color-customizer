const mongoose = require('mongoose');
const moment = require('moment');
var Schema = mongoose.Schema;

var SassSchema = new Schema({
  name: String,
  labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }],
  code: { type: String, required: true },
  created: Date,
  downloadUrl: String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

SassSchema
  .virtual('url')
  .get(function() {
    return '/sass/sass/' + this._id;
  });

SassSchema
  .virtual('created_formatted')
  .get(function () {
    return this.created ? moment(this.created).format('MMMM Do, YYYY') : 'N\/A';
  });

module.exports = mongoose.model('Sass', SassSchema);
