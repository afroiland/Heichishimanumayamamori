app.factory('DataFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
  console.log("factory running");

  var currentUser = undefined;
  var auth = $firebaseAuth();
  var players = undefined;

  function logIn() {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      console.log('firebaseUser.user.email: ', firebaseUser.user.email);
      currentUser = firebaseUser.user;
      console.log('currentUser: ', currentUser);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  function logOut() {
    return auth.$signOut().then(function() {
      currentUser = undefined;
      console.log('logged out');
      console.log('currentUser: ', currentUser);
    });
  };

  // auth.$onAuthStateChanged(function(firebaseUser){
  //     // console.log('firebaseUser: ', firebaseUser);
  //     // self.currentUser = firebaseUser;
  //     if(firebaseUser) {
  //       firebaseUser.getToken().then(function(idToken) {
  //         $http({
  //           method: 'GET',
  //           url: '/privateData',
  //           headers: {
  //             id_token: idToken
  //           }
  //         // console.log('firebaseUser: ', firebaseUser);
  //         }).then(function(response) {
  //           self.secretData = response.data;
  //         });
  //       });
  //     } else {
  //       //add user to db eventually
  //       console.log('Not logged in or authorized');
  //       self.secretData = [];
  //     }
  // });



  function getPlayers() {
    return $http.get('/roster').then(function(response) {
        console.log('response.data: ', response.data);
        players = response.data;
      });
  }




  var publicApi = {
    logIn: function() {
      return logIn();
    },
    logOut: function() {
      return logOut();
    },
    // stateChanged: function() {
    //   return stateChanged();
    // },
    getPlayers: function() {
      return getPlayers();
    },
    playerData: function() {
      return players;
    }
  };

  return publicApi;


}]);
