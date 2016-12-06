var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/roster' ,{
      templateUrl: '/views/templates/roster.html',
      controller: 'RosterController',
      controllerAs: 'roster'
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

app.controller('HomeController', function() {
  console.log('home controller running');
  var self = this;
  self.message = "Home controller is the best!";

});

app.controller('RosterController', function() {
  console.log('roster controller running');
  var self = this;
  self.message = "Roster controller is the best!";

});

app.controller('LeaderboardController', function() {
  console.log('leaderboard controller running');
  var self = this;
  self.message = "Leaderboard controller is the best!";

});

app.controller('AboutController', function() {
  console.log('about controller running');
  var self = this;
  self.message = "About controller is the best!";

});
