app.controller('HomeController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
  // console.log('home controller running');

  var self = this;
  // var auth = $firebaseAuth();
  // self.currentUser = {};
  // self.newUser = {};

  self.logIn = DataFactory.logIn;
  self.logOut = DataFactory.logOut;

}]);
