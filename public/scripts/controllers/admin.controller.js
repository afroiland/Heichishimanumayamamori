app.controller('AdminController', ['$http', 'DataFactory', '$q', function($http, DataFactory, $q) {
  // console.log('admin controller running');
  var self = this;

  self.currentUser = DataFactory.currentUser();
  self.players = [];
  // self.selectedPlayer = {};
  var playersWithNewPoints = [];

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
          self.selectedPlayer.new_point_total = null;
      });

    } else {
      alert('Not authorized');
    }
  }

  self.runIt = function() {
    console.log("running it");
    var deferred = $q.defer();
    $http.get('/mtgjson')
      .then(function(response) {
        console.log('response.data from json: ', response.data);
        deferred.resolve();
        return deferred.promise;
        $http.put('/mtgjson')
          .then(function(response) {
            console.log("json put request went through?");
          });
      });
  }


}]);
