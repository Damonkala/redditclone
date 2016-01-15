'use strict';

var app = angular.module('redditcloneApp', ['ui.router', 'ngStorage']);

app.constant('ENV', {
  API_URL: 'http://localhost:3000'
});

app.run(function($rootScope, $localStorage) {
  $rootScope.$storage = $localStorage;
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', { url: '/login', templateUrl: 'partials/login.html', controller: 'loginCtrl'})
    .state('register', { url: '/register', templateUrl: 'partials/register.html', controller: 'registerCtrl'})

    .state('posts', { url: '/posts', templateUrl: 'partials/posts/layout.html', abstract: true })
    .state('posts.index', { url: '/', templateUrl: 'partials/posts/postsIndex.html', controller: 'postIndexCtrl'})
    .state('posts.show', { url: '/{postId}', templateUrl: 'partials/posts/postsShow.html', controller: 'postShowCtrl'})


});
