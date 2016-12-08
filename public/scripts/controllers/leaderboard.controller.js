app.controller('LeaderboardController', ["$http", 'DataFactory', function($http, DataFactory) {
  console.log('leaderboard controller running');
  var self = this;
  self.users = [];

  getUsers();

  function getUsers() {
    $http.get('/leaderboard')
      .then(function(response) {
        // console.log('response.data: ', response.data);
        self.users = response.data;
      });
  }

}]);
