app.controller('AdminController', ['$http', 'DataFactory', function($http, DataFactory) {
  console.log('admin controller running');
  var self = this;

  self.players = [];

  getPlayers();

  function getPlayers() {
    $http.get('/admin/players')
    .then(function(response) {
      self.players = response.data;
      console.log('response.data: ', response.data);
    })
  }

}]);
