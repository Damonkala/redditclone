var express = require('express');
var router = express.Router();

var Post = require('../models/post')


router.get('/list', function(req, res, next) {
  Post.find({}, function(err, posts){
    res.send(posts)
  })
});

router.post('/new', function(req, res) {
  Post.create(req.body, function(err, posts) {
    res.status(err ? 400 : 200).send(err || posts);
    console.log(posts)
    var postID = req.body._id;
    console.log(postID)
  });
});

module.exports = router;
