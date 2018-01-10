//models/news.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConfigSchema   = new Schema({
    lastUpdated : Date,
    lastUpdatedMedia : Date,
    lastUpdatedNews : Date,
    colourScheme : String,
    mediaCount : Number,
    newsCount : Number
});

module.exports = mongoose.model('Config', ConfigSchema);