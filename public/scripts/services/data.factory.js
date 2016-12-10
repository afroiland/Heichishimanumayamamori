app.factory('DataFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
  console.log("factory running");

  var auth = $firebaseAuth();
  var currentUser = undefined;

  var loggedIn = false;

  var players = undefined;
  var newPlayer = undefined;

  function logIn() {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      console.log('firebaseUser.user.email: ', firebaseUser.user.email);
      currentUser = firebaseUser.user;
      // console.log('currentUser: ', currentUser);
      loggedIn = true;
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  function logOut() {
    return auth.$signOut().then(function() {
      currentUser = undefined;
      loggedIn = false;
      console.log('logged out');
      console.log('currentUser: ', currentUser);
    });
  };

  function getCurrentUser() {
    return currentUser;
  }

  function getUserStatus() {
    return loggedIn;
  }

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
    if(currentUser) {
      // logged in
      return currentUser.getToken().then(
        function(idToken){
          return $http({
            method: 'GET',
            url: '/roster',
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            players = response.data;
            console.log('Factory getPlayers: ', players);
            // return players;
          },
            function(response) {
              console.log('factory get error response: ', response);
              // didn't work
              players = undefined;
            });
        });
    } else {
      console.log('factory get players not logged in.');
      currentUser = undefined;
    }

      // previous, no token sent
    // $http.get('/roster').then(function(response) {
    //   // console.log('response.data: ', response.data);
    //   players = response.data;
    // });
    // players = undefined;
  }

  // function addPlayer() {
  //   return $http.post('/roster', newPlayer).then(function(response) {
  //     console.log('POST finished. getPlayers(); again.');
  //     getPlayers();
  //   });
  // }

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
      console.log('factory players is:', players);
      return players;
    },
    addPlayer: function() {
      return addPlayer;
    },
    currentUser: function() {
      return getCurrentUser();
    },
    loggedIn: function() {
      return getUserStatus();
    }
  };

  return publicApi;

}]);
