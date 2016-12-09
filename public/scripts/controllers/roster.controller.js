app.controller('RosterController', ['$http', 'DataFactory', function($http, DataFactory) {
  console.log('roster controller running');
  var self = this;
  self.newPlayer = {};
  self.players = [];

  getPlayers();

  function getPlayers() {
    if(DataFactory.playerData() === undefined) {
      DataFactory.getPlayers().then(function(response) {
        self.players = DataFactory.playerData();
        console.log('got data from factory: ', self.players);
      });
    } else {
      self.players = DataFactory.playerData();
    }
  }



  // function getPlayers() {
  //   $http.get('/roster')
  //     .then(function(response) {
  //       // console.log('response.data: ', response.data);
  //       self.players = response.data;
  //     });
  // }

  self.addPlayer = function() {
    console.log('new player: ', self.newPlayer);
    $http.post('/roster', self.newPlayer)
      .then(function(response) {
        console.log('POST finished. getPlayers(); again.');
        getPlayers();
      });
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
