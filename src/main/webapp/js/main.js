var app = angular.module('index', []);
app.controller('FormController', function($scope, $location, $http) {
	
	$scope.addVehicle = function() {
		var formData = new FormData();
		var file = $scope.hexFile;
		
		formData.append("markName", $scope.markName);
		formData.append("modelName", $scope.modelName);
		formData.append("vehicleYear", $scope.vehicleYear);
		formData.append("dateRepaired", $scope.dateRepaired);
		formData.append("vehicleChangesComment", $scope.vehicleChangesComment);
		formData.append("file", file);

		$http({
			method : 'POST',
			url : $location.absUrl() + "upload",
			headers : {
				'Content-Type' : undefined
			},
			data : formData,
			transformRequest : angular.identity
		}).then(function successCallback(response) {
			// Auto Success
		}, function errorCallback(response) {
			// Auto Error
		});
	}
});

app.directive('bindFile', [ function() {
	return {
		require : "ngModel",
		restrict : 'A',
		link : function($scope, el, attrs, ngModel) {
			el.bind('change', function(event) {
				ngModel.$setViewValue(event.target.files[0]);
				$scope.$apply();
			});

			$scope.$watch(function() {
				return ngModel.$viewValue;
			}, function(value) {
				if (!value) {
					el.val("");
				}
			});
		}
	};
} ]);

