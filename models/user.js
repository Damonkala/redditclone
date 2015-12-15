'use strict';

var mongoose = require('mongoose');
// var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username: {type: String, reqired: true, unique: true},
	password: {type: String, reqired: true},
	email: {type: String, reqired: true}
});

userSchema.statics.register = function(user, cb) {
  var username = user.username;
  var password = user.password;
  var email = user.email;
  User.findOne({username: username}, function(err, user){
    if(err || user) return cb(err || 'Username already taken.');
    bcrypt.genSalt(13, function(err1, salt) {
      bcrypt.hash(password, salt, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = hash;
        newUser.save(function(err, savedUser){
          savedUser.password = null;
          cb(err, savedUser);
        });
      });
    });
  });
};

var User = mongoose.model('User', userSchema);


module.exports = User;
