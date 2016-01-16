'use strict';

var app = angular.module('redditcloneApp');

app.controller('postShowCtrl', function($scope, $state, $http, ENV, PostService, CommentService) {
  PostService.show($state.params.postId)
  .then(function(res) {
    $scope.post = res.data;
    $scope.postId = res.data._id;
    console.log(res.data.comments);
    $scope.comments = res.data.comments;
  });
  $scope.submit = function(comment){
    var newComment = {};
    newComment.content = comment;
    newComment.postId = $scope.postId;
    CommentService.post(newComment)
    .then(function(res){
      $state.go('posts.show', {'postId':res.data._id});
    })
    console.log("New Comment", comment);
    console.log("PostID",   $scope.postId);
  }
});
