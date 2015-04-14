(function () {

	angular.module("app").controller("parkingOverviewController", ["$scope", "$http", function ($scope, $http) {
		// $scope eigenschappen
		$scope.parkings = $scope.parkings || [];
		$scope.orderOn = $scope.orderOn || "description";
		$scope.filter = "";

		// filters, events
		$scope.filterOn = function (currentParking) {
			return currentParking.description.toLowerCase().indexOf($scope.filter.toLowerCase()) !== -1;
		};

		$scope.capacity = function (currentParking) {
			console.log("test")
			if (currentParking.available < currentParking.capacity * .1 || currentParking.available < 40) {
				return "full";
			} else if (currentParking.available < currentParking.capacity * .2 || currentParking.available < 80) {
				return "almostFull";
			}
		};

		// callbacks

		function onSuccess (response) {
			console.log(response);

			for (var k = 0; k < response.Parkings.parkings.length; k++) {
				var parking = response.Parkings.parkings[k];
				$scope.parkings.push(new Parking(parking.name,
				                                 parking.description,
				                                 parking.availableCapacity,
				                                 parking.totalCapacity));
			}
			console.log($scope.parkings);
		}

		function onError (response) {
			console.log("error");
		}

		// $http, ...

		$http.get("http://datatank.gent.be/Mobiliteitsbedrijf/Parkings.json").success(onSuccess).error(onError);
	}]);

})();