const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
  label: { type: String, required: true, min: 3, max: 100 }
});

LabelSchema
  .virtual('url')
  .get(function() {
    return '/labels/label/' + this._id;
  });

module.exports = mongoose.model('Label', LabelSchema);
