const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SassLabelSchema = new Schema({ 
  label: {type: String, required: true, min: 3, max: 100},
  sasses: [{type: Schema.Types.ObjectId, ref: 'Sass', required: true}] 
});


module.exports = mongoose.model('SassLabel', SassLabelSchema);