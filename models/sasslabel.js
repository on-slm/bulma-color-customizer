const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SassLabelSchema = new Schema({
  label: {type: String, required: true, min: 3, max: 100},
});

SassLabelSchema
  .virtual('url')
  .get(function () {
    return '/sasslabel/' + this._id;
  });

module.exports = mongoose.model('SassLabel', SassLabelSchema);
