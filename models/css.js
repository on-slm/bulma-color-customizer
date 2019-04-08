const mongoose = require('mongoose');
const moment = require('moment');
var Schema = mongoose.Schema;

var CssSchema = new Schema({
  name: String,
  labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }],
  code: {type: String, required: true},
  created: Date,
  downloadUrl: String,
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

CssSchema
  .virtual('url')
  .get(function() {
    return '/css/css/' + this._id;
  });

CssSchema
  .virtual('created_formatted')
  .get(function() {
    return this.created ? moment(this.created).format('MMMM Do, YYYY') : 'N\/A';
  });

module.exports = mongoose.model('Css', CssSchema);
