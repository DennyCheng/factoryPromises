myApp.controller('AddressController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    console.log('Address Controller');

    $scope.dataFactory = DataFactory;
    $scope.message = 'Addresses!';
    $scope.people = [];

    // tell the factory to get data from the DB so we can use it
    if($scope.dataFactory.peopleData() === undefined) {
      console.log('factory has no data, getting it now.');
      $scope.dataFactory.retrieveData().then(function() {
        $scope.people = $scope.dataFactory.peopleData();
      });
    } else {
      $scope.people = $scope.dataFactory.peopleData();
    }

}]);
