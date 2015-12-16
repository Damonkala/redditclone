'use strict';

var app = angular.module('redditcloneApp', ['ui.router', 'ngStorage']);

app.constant('ENV', {
  API_URL: 'http://localhost:3000'
});

app.run(function($rootScope, $localStorage) {
  $rootScope.$storage = $localStorage;
});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', { url: '/login', templateUrl: 'partials/login.html', controller: 'loginCtrl'})
    .state('register', { url: '/register', templateUrl: 'partials/register.html', controller: 'registerCtrl'})

    // .state('posts', { url: '/post', templateUrl: 'templates/post/layout.html', abstract: true })
    // .state('post.index', { url: '/', templateUrl: 'templates/post/postIndex.html', controller: 'postIndexCtrl'})
    // .state('post.show', { url: '/{bookId}', templateUrl: 'templates/post/postShow.html', controller: 'postShowCtrl'})


});
