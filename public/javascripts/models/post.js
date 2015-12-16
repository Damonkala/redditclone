'use strict';

var app = angular.module('redditcloneApp');

app.service('PostService', function($http, ENV) {
  this.index = function() {
    return $http.get(`${ENV.API_URL}/posts/`);
  };
  this.show = function(postId) {
    return $http.get(`${ENV.API_URL}/posts/${postId}`);
  };
});
