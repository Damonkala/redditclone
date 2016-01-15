'use strict';

var app = angular.module('redditcloneApp');

app.controller('postIndexCtrl', function($scope, $state, PostService) {
  PostService.index()
  .then(function(res) {
    $scope.posts = res.data;
  }, function(err) {
    console.error(err);
  });
  $scope.submit = function(post){
    PostService.post(post)
    .then(function(res) {
      $scope.postId = res.data._id;
      $state.go('posts.show', {'postId':$scope.postId});
      // PostService.show($scope.postId)
    }, function(err) {
      console.error(err);
    })
  }
});
