app.controller('RosterController', ['$http', 'DataFactory', function($http, DataFactory) {
  console.log('roster controller running');
  var self = this;
  self.newPlayer = {};
  self.players = [];
  self.currentUser = DataFactory.currentUser();
  self.loggedIn = DataFactory.loggedIn();

  getPlayers();

  function getPlayers() {
    // if(DataFactory.playerData() === undefined) {
      DataFactory.getPlayers().then(function(response) {
        self.players = DataFactory.playerData();
        console.log('got data from factory: ', self.players);
      });
    // } else {
      // self.players = DataFactory.playerData();
    // }
  }

  // console.log('self.currentUser: ', self.currentUser);
  checkInfo();

  function checkInfo () {
    console.log('self.loggedIn: ', self.loggedIn);
    if (self.loggedIn == true) {
      console.log('self.currentUser.email: ', self.currentUser.email);
    }
  }

  // self.addPlayer = DataFactory.addPlayer;
  self.addPlayer = function() {
    if(self.loggedIn == true) {
    console.log('new player: ', self.newPlayer);
    $http.post('/roster', self.newPlayer)
      .then(function(response) {
        // console.log('POST finished. getPlayers(); again.');
        getPlayers();
      });
    } else {
      alert("You must be logged in to add a player.")
    }
  }

  self.deletePlayer = function(player) {
    console.log('deleting player: ', player);
    $http.delete('/roster/' + player.id)
      .then(function(response) {
        console.log('DELETE finished. getPlayers(); again.');
        getPlayers();
      });
  }

}]);
