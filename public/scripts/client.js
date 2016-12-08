var app = angular.module('myApp', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/roster', {
      templateUrl: '/views/templates/roster.html',
      controller: 'RosterController',
      controllerAs: 'roster'
    })
    .when('/leaderboard', {
      templateUrl: '/views/templates/leaderboard.html',
      controller: 'LeaderboardController',
      controllerAs: 'leaderboard'
    })
    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    })
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin'
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
