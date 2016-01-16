var express = require('express');
var router = express.Router();

var Comment = require('../models/comment')
var Post = require('../models/post')


router.post('/new', function(req, res) {
  Comment.create(req.body, function(err, comments) {
    Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comments}},
    function(err, data){
      res.send(data)
    })
  });
});

router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    res.status(err ? 400 : 200).send(err || comment);
  }).populate('comments');
});

router.put('/:commentId/addComment/:secondCommentId', function(req, res) {
  Comment.findById(req.params.commentId, function(err, comment) {
    console.log('ERROR:', err)
    console.log('COMMENT:', comment)
    if(err || !comment) return res.status(400).send({err: 'Comment not found.'});
    comment.comments.push(req.params.secondCommentId);
    comment.save(function(err, savedComment) {
      res.status(err ? 400 : 200).send(err || savedComment);
    });
  });
});
router.delete('/', function(req, res, next) {
  Comment.findByIdAndRemove(req.body.id, function(err, data){
    res.send(data);
  })
});
module.exports = router;
