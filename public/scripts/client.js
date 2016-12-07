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

  self.currentUser = {};
  self.newUser = {};

  self.message = "Home controller is the best!";
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  auth.$onAuthStateChanged(function(firebaseUser){
    self.currentUser = firebaseUser;
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.secretData = response.data;
        });
      });
    } else {
      console.log('Not logged in or authorized');
      self.secretData = [];
    }
  });
});

app.controller('RosterController', function($http) {
  console.log('roster controller running');
  var self = this;
  self.message = "Roster controller is the best!";
  self.newPlayer = {};
  self.players = [];

  getPlayers();

  function getPlayers() {
    $http.get('/roster')
      .then(function(response) {
        console.log('response.data: ', response.data);
        self.players = response.data;
      });
  }


  self.addPlayer = function() {
    console.log('new player: ', self.newPlayer);
    $http.post('/roster', self.newPlayer)
      .then(function(response) {
        console.log('POST finished. getPlayers(); again.');
        getPlayers();
      });
  }

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
