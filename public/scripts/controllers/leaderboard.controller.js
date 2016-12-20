app.controller('LeaderboardController', ["$http", function($http) {
  // console.log('leaderboard controller running');
  var self = this;
  self.users = [];

  getUsers();

  function getUsers() {
    // console.log('lbcontroller getUsers');
    $http.get('/leaderboard')
      .then(function(response) {
        console.log('response.data: ', response.data);
        self.users = response.data;
        for (var i = 0; i < self.users.length; i++) {
          if(self.users[i].sum == null) {
            self.users[i].sum = 0;
          };
        };
        console.log('self.users: ', self.users);
      });
  }

}]);
