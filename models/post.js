'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post;

var postSchema = new Schema({
	user: {type: String, required: true},
	title: {type: String, required: true},
	score: {type: Number, default: 0},
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	timestamp: {type: Date, default: Date.now},
	content: {type: String, required: true}
});

Post = mongoose.model('Post', postSchema);


module.exports = Post;
