app.controller('AdminController', ['$http', 'DataFactory', function($http, DataFactory) {
  console.log('admin controller running');
  var self = this;

  self.players = [];

  getPlayers();

  function getPlayers() {
    $http.get('/admin/players')
    .then(function(response) {
      self.players = response.data;
      // console.log('response.data: ', response.data);
    })
  }

  self.updatePoints = function(player) {
    // console.log('updating player points for: ', player);
    $http.put('/admin/' + player.id, player)
      .then(function(response) {
        console.log('updated points for', player.first_name + ' ' + player.last_name);
    });
  }

}]);
