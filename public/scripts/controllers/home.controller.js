app.controller('HomeController', ['firebase', '$http', 'DataFactory', function($firebaseAuth, $http, DataFactory) {
  console.log('home controller running');
  var auth = $firebaseAuth();
  var self = this;

  self.currentUser = {};
  self.newUser = {};

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
}]);
