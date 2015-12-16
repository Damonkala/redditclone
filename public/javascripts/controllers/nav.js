'use strict';

var app = angular.module('redditcloneApp');

app.controller('navCtrl', function($scope, $state) {
  $scope.logout = function(){
    delete $scope.$storage.myToken;
    $state.go('post.index');
  };
});
