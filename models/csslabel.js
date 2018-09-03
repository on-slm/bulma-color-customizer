const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CssLabelSchema = new Schema({ 
  label: {type: String, required: true, min: 3, max: 100}, 
  csses: [{type: Schema.Types.ObjectId, ref: 'Css', required: true}] 
});


module.exports = mongoose.model('CssLabel', CssLabelSchema);