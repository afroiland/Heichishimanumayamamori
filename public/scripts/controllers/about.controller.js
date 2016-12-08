app.controller('AboutController', ['$http', 'DataFactory', function($http, DataFactory) {
  console.log('about controller running');
  var self = this;

  aboutTest();

  function aboutTest() {
    console.log('about test');
  }

}]);
