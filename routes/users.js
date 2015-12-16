var express = require('express');
var router = express.Router();

var User = require('../models/user')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.delete('/', function(req, res, next) {
  User.findByIdAndRemove(req.body.id, function(err, data){
    res.send(data);
  })
});

router.post('/register', function(req, res) {
  console.log(req.body)
  User.register(req.body, function(err, savedUser){
    res.status(err ? 400 : 200).send(err || savedUser);
    console.log(savedUser)
  });
});
router.post('/login', function(req, res, next) {
  User.authenticate(req.body, function(err, user){
  res.status(err ? 400 : 200).send(err || user);
  });
	// var payload = {
  //   username: req.body.username,
  //   password: req.body.password,
  //   email: req.body.email
	// };
	// return jwt.encode(payload, process.env.JWT_SECRET);
})

// });

module.exports = router;
