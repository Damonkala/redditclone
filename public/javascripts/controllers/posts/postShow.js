'use strict';

var app = angular.module('redditcloneApp');

app.controller('postsShowCtrl', function($scope, $state, $http, ENV, PostService) {
  PostService.show($state.params.postId)
  .then(function(res) {
    $scope.post = res.data;
  });
});
