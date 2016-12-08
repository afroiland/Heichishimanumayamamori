app.controller('AdminController', ['$http', 'DataFactory', function($http, DataFactory) {
  console.log('admin controller running');
  var self = this;

  adminTest();

  function adminTest() {
    console.log('admin test');
  }

}]);
