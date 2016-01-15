var express = require('express');
var router = express.Router();

var Post = require('../models/post')


router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts){
    res.send(posts)
  })
});
router.delete('/', function(req, res, next) {
  Post.findByIdAndRemove(req.body.id, function(err, data){
    res.send(data);
  })
});

router.post('/new', function(req, res) {
  Post.create(req.body, function(err, posts) {
    Post.find({}, function(err, posts){
      res.send(posts)
    })
    // res.status(err ? 400 : 200).send(err || posts);
    console.log("RETURNED POSTS", posts)
    var postID = req.body._id;
    console.log("NEW POST ID:", postID)
  });
});

router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    res.status(err ? 400 : 200).send(err || post);
  }).populate('comments');
});

router.put('/:postId/addComment/:commentId', function(req, res) {
  Post.findById(req.params.postId, function(err, post) {
    console.log('ERROR:', err)
    console.log('POST:', post)
    if(err || !post) return res.status(400).send({err: 'Post not found.'});
    post.comments.push(req.params.commentId);
    post.save(function(err, savedPost) {
      res.status(err ? 400 : 200).send(err || savedPost);
    });
  });
});

module.exports = router;
