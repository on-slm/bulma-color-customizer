const mongoose = require('mongoose');
const moment = require('moment');
var Schema = mongoose.Schema;


var CssSchema = new Schema({
  name: String,
  labels: [{ type: Schema.Types.ObjectId, ref: 'CssLabel' }],
  code: {type: String, required: true},
  created: Date,
  downloadUrl: String,
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

CssSchema
  .virtual('url')
  .get( () => {
    return '/csses/' + this._id;
  });

CssSchema
  .virtual('created_formatted')
  .get(() => {
    return moment(this.created).format('MMMM Do, YYYY');
  });

module.exports = mongoose.model('Css', CssSchema);
