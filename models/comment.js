'use strict';

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	user: {type: String, reqired: true},
	score: {type: Number},
	timestamp: {type: Date, default: Date.now},
	content: {type: String, reqired: true},
	comments: {type: Array},
});

var Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;
