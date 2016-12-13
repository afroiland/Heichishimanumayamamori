app.factory('DataFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
  // console.log("factory running");

  var auth = $firebaseAuth();
  var currentUser = undefined;
  var users = undefined;
  var emailInDatabase = false;
  var loggedIn = false;
  var players = undefined;
  var newPlayer = undefined;

  function logIn() {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      console.log('firebaseUser.user.email: ', firebaseUser.user.email);
      currentUser = firebaseUser.user;
      console.log('currentUser: ', currentUser);
      loggedIn = true;

      // //Trying to add new user to db
      // $http.get('/login')
      //   .then(function(response) {
      //     console.log('login response.data: ', response.data);
      //     users = response.data;
      //   });
      // for (var i = 0; i < users.length; i++) {
      //   if(currentUser.email == users[i].email) {
      //     emailInDatabase = true;
      //   }
      // }
      // if (emailInDatabase == false) {
      //   console.log('trying to add currentUser: ', currentUser);
      //   $http.post('/login', currentUser)
      //     .then(function(response) {
      //       console.log('added user to db:');
      //     })
      // }



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
      return currentUser.getToken().then(   //firebase getting idToken
        function(idToken){
          // console.log('idToken: ', idToken);
          return $http({
            method: 'GET',
            url: '/roster',
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            players = response.data;
            // console.log('Factory getPlayers: ', players);
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

  function addPlayer(test) {
    console.log('factory adding player');
    if (currentUser) {
      return currentUser.getToken().then(
        function(idToken) {
          $http({
            method: 'POST',
            url: '/roster',
            headers: {
              id_token: idToken
            },
            data: {
              new_player: test
            }
          }).then(function(response) {
            console.log('added player, getting players again');
            getPlayers();
        });
      });
    } else {
      console.log('factory add player not logged in');
    }
  }

  function deletePlayer(thing) {
    console.log('thing: ', thing);
    if (currentUser) {
      return currentUser.getToken().then(
        function(idToken) {
          $http({
            method: 'DELETE',
            url: '/roster',
            headers: {
              id_token: idToken
            },
            data: {
              key: 'thing'
            }
          }).then(function (response) {
            console.log('deleted player: ', thing);
            getPlayers();
        });
      });
    } else {
      console.log('factory add player not logged in');
    }
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
      // console.log('factory players is:', players);
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
    },
    newPlayer: function() {
      return newPlayer;
    },
    deletePlayer: function() {
      return deletePlayer;
    }
  };

  return publicApi;

}]);
