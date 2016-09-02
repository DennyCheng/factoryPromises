myApp.factory('DataFactory', ['$http', function($http) {
    // PRIVATE
    var people = undefined;

    var getData = function() {
      console.log('DF getting data from server');
      var promise = $http.get('/data').then(function(response) {
          // data returned, put it in our array
          //this promise is defined as a explicit way to express "promise" being created
          //when the GET request is sent out to the server. And while the GET request is watiing
          //for a response it sends a promise back as a place holder for the actual
          //server response.
          //Once the GET request is processed and receives a response it will
          //then proceed to "fulfill" the promise by sending the data to the ccontroller
          //By fulfilling the promise it will replace the placeholder promise with the actual response
          //this process is asynchronous so it happens in the background while things are processed.
          //also Tyler sucks so much it makes me want to cry. 
          people = response.data;
          console.log('DF Async data response:', people);
      });
      ///explicity sending the promise back to the controller/who invoked the function
      return promise;
    };

    var addPerson = function(name) {
      var promise = $http.post('/data', {name: name}).then(function(response) {
        console.log('DF post completed');
        // done, now refresh out data
        return getData();
      });

      return promise;
    }

    // PUBLIC API object
    return {
      peopleData: function() {
        return people;
      },
      retrieveData: function() {
        return getData();
      },
      addName: function(name) {
        return addPerson(name);
      }
    };
}]);
