var app = angular.module('myApp', ['ngRoute', 'firebase']);

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

app.controller('HomeController', function($firebaseAuth, $http) {
  console.log('home controller running');
  var auth = $firebaseAuth();
  var self = this;
  self.message = "Home controller is the best!";
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

});

app.controller('RosterController', function() {
  console.log('roster controller running');
  var self = this;
  self.message = "Roster controller is the best!";

});

app.controller('LeaderboardController', ["$http", function($http) {
  console.log('leaderboard controller running');
  var self = this;
  self.message = "Leaderboard controller is the best!";
  self.users = [];

  getUsers();

  function getUsers() {
    $http.get('/leaderboard')
      .then(function(response) {
        // console.log('response.data: ', response.data);
        self.users = response.data;
      });
  }

}]);

app.controller('AboutController', function() {
  console.log('about controller running');
  var self = this;
  self.message = "About controller is the best!";

});


//added ['firebase'] as param on line 1
//added $firebaseAuth, $http as params for function line 31
