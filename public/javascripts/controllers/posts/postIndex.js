'use strict';

var app = angular.module('redditcloneApp');

app.controller('postIndexCtrl', function($scope, $state, PostService) {
  PostService.index()
  .then(function(res) {
    $scope.posts = res.data;
  }, function(err) {
    console.error(err);
  });
});
