var express = require('express');
var router = express.Router();

var User = require('../models/user')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err, savedUser){
    res.status(err ? 400 : 200).send(err || savedUser);
    console.log(savedUser)
  });
});
router.post('/login', function(req, res, next) {
  User.authenticate(req.body, function(err, user){
  res.status(err ? 400 : 200).send(err || user);
});
});

module.exports = router;
