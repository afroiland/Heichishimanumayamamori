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
      // if(DataFactory.playerData() === undefined) {
        DataFactory.getPlayers().then(function(response) {
          console.log('response from factory', response);
          // self.players = response;
          // self.players = [{first_name: 'hello'}];
          self.players = DataFactory.playerData();
          console.log('got data from factory: ', self.players);
          $scope.$apply(); // "works but is wrong!" -Kris
        });
      // } else {
      //   self.players = DataFactory.playerData();
      // }
    } else {
      console.log('roster controller getPlayers not logged in');
    }
  }

  self.placeholder = DataFactory.addPlayer();

  // self.addPlayer = function(test) {
  //   self.placeholder(test).then(getPlayers);
  // };

  self.addPlayer = function(test) {
    console.log('sending thing to factory');
    self.placeholder(test).then(function() {
      console.log('trying to add player pt1');
      getPlayers();
      // self.newPlayer.player_first_name = ' ';
      // self.newPlayer.player_last_name = ' ';
      console.log('trying to add player pt2');
    });
  };

  // self.addPlayer = DataFactory.addPlayer();

  self.placeholder2 = DataFactory.deletePlayer();

  self.deletePlayer = function(player_param) {
    self.placeholder2(player_param).then(function() {
      console.log('trying to delete player');
      getPlayers();
    });
  };

}]);
