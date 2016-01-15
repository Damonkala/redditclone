'use strict';

var app = angular.module('redditcloneApp');

app.controller('postShowCtrl', function($scope, $state, $http, ENV, PostService) {
  PostService.show($state.params.postId)
  .then(function(res) {
    $scope.post = res.data;
    console.log(res.data.comments);
    $scope.comments = res.data.comments;
  });
});
