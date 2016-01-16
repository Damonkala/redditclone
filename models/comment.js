'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = mongoose.Schema({
	user: {type: String},
	score: {type: Number, default: 0},
	timestamp: {type: Date, default: Date.now},
	content: {type: String, required: true},
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;
