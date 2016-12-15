app.controller('AdminController', ['$http', 'DataFactory', function($http, DataFactory) {
  // console.log('admin controller running');
  var self = this;

  self.currentUser = DataFactory.currentUser();
  self.players = [];

  // checkInfo();
  //
  // function checkInfo () {
  //   console.log('self.loggedIn: ', self.loggedIn);
  //   if (self.loggedIn == true) {
  //     console.log('self.currentUser.email: ', self.currentUser.email);
  //   }
  // }

  getPlayers();

  function getPlayers() {
    $http.get('/admin/players')
    .then(function(response) {
      self.players = response.data;
      // console.log('response.data: ', response.data);
    })
  }

  self.updatePoints = function(player) {
    console.log('self.currentUser: ', self.currentUser);
    if(self.currentUser.email == 'andrew.froiland@gmail.com') {
      console.log('updating player points for: ', player);
      $http.put('/admin/' + player.id, player)
        .then(function(response) {
          console.log('updated points for', player.player_first_name + ' ' + player.player_last_name);
      });
      // self.selectedPlayer.new_point_total = ' ';     //not working as is
    } else {
      alert('Not authorized');
    }
  }

}]);
