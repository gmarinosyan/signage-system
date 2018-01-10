//models/media.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MediaSchema   = new Schema({
    name: String,
    filename: String,
    filetype: String,
    type: String,
    duration: Number,
    order: Number
});

module.exports = mongoose.model('Media', MediaSchema);