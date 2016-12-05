var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/profile' ,{
      templateUrl: '/views/templates/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile'
    })
    .when('/leaderboard' ,{
      templateUrl: '/views/templates/leaderboard.html',
      controller: 'LeaderboardController',
      controllerAs: 'leaderboard'
    })
    .when('/about' ,{
      templateUrl: '/views/templates/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);
