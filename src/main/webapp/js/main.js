var app = angular.module('index', []);
app.controller('customersController', function($scope, $http) {
	$http.get("http://localhost:8080/showall").then(function(response) {
		$scope.vehicleResponse = response.data;
	});
});
app.controller('vehicleController', function($scope, $http) {
	$http.get("http://localhost:8080/showone?id=3").then(function(response) {
		$scope.vehicleData = response.data;
	
	});
});

app.controller('formController', function($scope, $location, $http) {
	$scope.mileage = 0;
	$scope.formDetails = {
		'modelName': $scope.modelName,
		'mileage': $scope.mileage,
		'fuelType': $scope.fuelType
	};
	
	$scope.addVehicle = function(){
		$http({
			method: 'POST',
			url: $location.absUrl() + "insertvehicle",
			data: $scope.formDetails,
			headers: {'Content-Type': 'application/json'}
		}).then(function successCallBack(response) {
			//Success
		}, function errorCallBack(response){
			//Error
		});
	}
	$scope.check = function(){
		console.log($scope.formDetails);
		console.log($location.absUrl());
	}
	$scope.test = function(){
		console.log($scope.formDetails);
		console.log($location.absUrl());
	}
	$scope.xasd = function(){
		console.log($scope.formDetails);
		console.log($location.absUrl());
	}
	$scope.ddd = function(){
		console.log($scope.formDetails);
		console.log($location.absUrl());
	}
});



