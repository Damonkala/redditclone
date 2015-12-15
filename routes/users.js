var express = require('express');
var router = express.Router();

var User = require('../models/user')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/', function(req, res, next) {
//   User.create(req.body, function(err, books) {
// 		res.status(err ? 400 : 200).send(err || books);
// 	});
// });

router.post('/register', function(req, res) {
  User.register(req.body, function(err, savedUser){
    res.status(err ? 400 : 200).send(err || savedUser);
    console.log(savedUser)
  });
});
router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username}, function(err, user){
    res.send(user)
    console.log(user)
  })
});

module.exports = router;
