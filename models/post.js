'use strict';

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	user: {type: String, reqired: true},
	title: {type: String, reqired: true},
	score: {type: Number},
	comments: {type: Array},
	timestamp: {type: Date, default: Date.now},
	content: {type: String, reqired: true}
});

var Post = mongoose.model('Post', postSchema);


module.exports = Post;
