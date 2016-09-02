myApp.controller('PeopleController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    console.log('People Controller');

    $scope.people = [];
    $scope.dataFactory = DataFactory;
    $scope.message = 'People!';
    $scope.formName = '';

    // tell the factory to get data from the DB so we can use it
    if($scope.dataFactory.peopleData() === undefined) {
      //this means the factory has no data to give us
      console.log('factory has no data, getting it now.');
      $scope.dataFactory.retrieveData().then(function() {
        //when $scope.dataFactory.retrieveData() is called it "jumps" to the dataFactory
        //where it hosts the function. When the function executes and sends the get request
        //it sends a placeholder "promise" back to controller and .then(function) WAITS
        //for the promise to be fulfilled. The promise is fulfilled when the server actually receives
        //a response back from the server.
        //once the promise is fulfilled ,then will then execute (no pun intended).
        $scope.people = $scope.dataFactory.peopleData();
      });
    } else {
      $scope.people = $scope.dataFactory.peopleData();
    }

    console.log('this happens now!');

    // Adds a person to the DB and then refresh our data from the factory
    $scope.addPerson = function() {
      console.log('adding a person....');
      $scope.dataFactory.addName($scope.formName).then(function(response) {
        $scope.people = $scope.dataFactory.peopleData();
      });

      $scope.formName = '';
    }


    console.log('when does this run?');

}]);
