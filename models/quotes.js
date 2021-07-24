var mongoose = require('mongoose');
// https://mongoosejs.com/docs/validation.html

// Define a schema
var Schema = mongoose.Schema;

var quotesSchema = new Schema({
  quote: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

const quotesModel = mongoose.model("quotesData", quotesSchema);

module.exports = quotesModel;