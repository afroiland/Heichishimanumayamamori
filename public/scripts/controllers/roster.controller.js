app.controller('RosterController', ['$http', 'DataFactory', '$scope', function($http, DataFactory, $scope) {
  // console.log('roster controller running');
  var self = this;
  self.newPlayer = DataFactory.newPlayer();
  self.players = [];
  self.currentUser = DataFactory.currentUser();
  self.loggedIn = DataFactory.loggedIn();

  getPlayers();

  function getPlayers() {
    if(self.loggedIn == true) {
      if(DataFactory.playerData() === undefined) {
        DataFactory.getPlayers().then(function(response) {
          // console.log('response from factory', response);
          // self.players = response;
          // self.players = [{first_name: 'hello'}];
          self.players = DataFactory.playerData();
          // console.log('got data from factory: ', self.players);
          $scope.$apply(); // "works but is wrong!" -Kris
        });
      } else {
        self.players = DataFactory.playerData();
      }
    } else {
      console.log('roster controller getPlayers not logged in');
    }
  }

  self.addPlayer = DataFactory.addPlayer();

  // self.addPlayer = function() {
  //   if(self.loggedIn == true) {
  //   console.log('new player: ', self.newPlayer);
  //   // $http.post('/roster', self.newPlayer)
  //   $http({
  //     method: 'POST',
  //     url: '/roster',
  //     headers: {
  //       id_token: idToken
  //     }
  //   }).then(function(response) {
  //       // console.log('POST finished. getPlayers(); again.');
  //       getPlayers();
  //     });
  //   } else {
  //     alert("You must be logged in to add a player.");
  //   }
  // }

  self.deletePlayer = DataFactory.deletePlayer();


  // self.deletePlayer = function(player) {
  //   console.log('deleting player: ', player);
  //   $http.delete('/roster/' + player.id)
  //     .then(function(response) {
  //       console.log('DELETE finished. getPlayers(); again.');
  //       getPlayers();
  //     });
  // }

}]);
