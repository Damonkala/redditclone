'use strict';

var app = angular.module('redditcloneApp');

app.controller('loginCtrl', function($scope, $state, $localStorage, UserService) {
  $scope.submit = function(user) {
    UserService.login(user)
    .then(function(res){
      $scope.$storage.myToken = res.data.token;
      $scope.$storage.id = res.data.id;
      $state.go('posts.index');
    }, function(err) {
      console.error(err);
    });
  }
});
