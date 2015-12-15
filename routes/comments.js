var express = require('express');
var router = express.Router();

var Comment = require('../models/comment')
var Post = require('../models/post')


// router.get('/list', function(req, res, next) {
//   Post.find({}, function(err, posts){
//     res.send(posts)
//   })
// });

router.post('/new', function(req, res) {
  Comment.create(req.body, function(err, comments) {
    res.status(err ? 400 : 200).send(err || comments);
    console.log("COMMENTS", comments)
    Post.findOneAndUpdate('566f6a18d32f9dbddf9bf56f', {$push: {comments: comments}},
    function(err, data){
      console.log(data)
    })
  });
});

module.exports = router;
