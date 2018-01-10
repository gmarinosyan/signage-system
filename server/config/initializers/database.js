// config/initializers/database.js

module.exports = function(cb) {
	'use strict';
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/db'); // connect to our database
	cb();
};
