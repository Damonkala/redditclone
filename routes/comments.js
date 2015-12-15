var express = require('express');
var router = express.Router();

var Comment = require('../models/comment')
var Post = require('../models/post')


router.post('/new', function(req, res) {
  Comment.create(req.body, function(err, comments) {
    res.status(err ? 400 : 200).send(err || comments);
    console.log("COMMENTS", comments)
    Post.findByIdAndUpdate('566f797e3413351fe5287c5b', {$push: {comments: comments}},
    function(err, data){
      console.log(data)
    })
  });
});
router.post('/reply', function(req, res) {
  Comment.create(req.body, function(err, comments) {
    res.status(err ? 400 : 200).send(err || comments);
    console.log("COMMENTS", comments)
    Comment.findByIdAndUpdate('566f7a6e8d651245e5864c81', {$push: {comments: comments}},
    function(err, data){
      console.log(data)
    })
  });
});

module.exports = router;
