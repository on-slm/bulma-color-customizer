// TODO remove this file
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CssLabelSchema = new Schema({
  label: {type: String, required: true, min: 3, max: 100},
});

CssLabelSchema
  .virtual('url')
  .get(function() {
    return '/csslabel/' + this._id;
  });

module.exports = mongoose.model('CssLabel', CssLabelSchema);
