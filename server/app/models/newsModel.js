//models/news.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NewsSchema   = new Schema({
    content: String,
    duration: Number,
    order: Number
});

module.exports = mongoose.model('News', NewsSchema);