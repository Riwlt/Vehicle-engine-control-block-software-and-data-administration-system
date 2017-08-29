var app = angular
		.module('index', [ 'ngRoute', 'ngCookies' ])
		.config(
				function($routeProvider, $httpProvider, $locationProvider) {
					
					// Controllers
					$routeProvider.when('/index', {
						templateUrl : '/index',
						controller : 'index'
					}).when('/login', {
						templateUrl : 'login',
						controller : 'navigation'
					}).when('/vehicleform', {
						templateUrl : 'vehicleform',
						controller : 'FormController'
					}).otherwise({
						redirectTo : '/'
					});
					// //////////////////////////////////////////////////
					// Removing #! in URL
					$locationProvider.html5Mode({
						enabled : true,
						requireBase : false
					});
					$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
					$httpProvider.defaults.withCredentials = true;
					$httpProvider.interceptors.push('XSRFInterceptor');
				});
// Navigation
app.controller('navigation', function($rootScope, $http, $location, $route,
		$window) {
	var self = this;
	self.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};
	// Authentication
	var authenticate = function(credentials, callback) {
		var headers = credentials ? {
			authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)
		} : {};
		// Get user
		$http.get('user', {
			headers : headers
		}).then(function(response) {
			if (response.data.name) {
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			callback && callback($rootScope.authenticated);
		}, function() {
			$rootScope.authenticated = false;
			callback && callback(false);
		});

	};
	authenticate();

	self.credentials = {};
	self.login = function() {
		authenticate(self.credentials, function(authenticated) {
			if (authenticated) {
				console.log("Login succeeded");
				$location.path("/");
				self.error = false;
				$rootScope.authenticated = true;
			} else {
				console.log("Login failed");
				$location.path("/");
				self.error = true;
				$rootScope.authenticated = false;
			}
		});
	};

	self.logout = function() {
		authenticate(self.credentials, function(authenticated) {
			$window.location.href = ("/");
			$rootScope.authenticated = false;
		})
	};

});
// Vehicle form
app.controller('FormController', function($http, $scope, $window, $location) {
	$scope.addVehicle = function() {
		var formData = new FormData();
		var file = $scope.hexFile;
		formData.append("markName", $scope.markName);
		formData.append("modelName", $scope.modelName);
		formData.append("vehicleYear", $scope.vehicleYear);
		formData.append("dateRepaired", $scope.dateRepaired);
		formData.append("vehicleChangesComment", $scope.vehicleChangesComment);
		formData.append("file", file);
		// Ajax posting Form Data
		$http({
			method : 'POST',
			//Sutvarkyt normalu url kad nebutu vehicleform
			url : $location.absUrl() + "upload",
			headers : {
				'Content-Type' : undefined
			},
			data : formData,
			transformRequest : angular.identity
		}).then(function successCallback(response) {
			console.log("success");
			$location.path("/");
			$window.location.href = "/";
		}, function errorCallback(response) {
			console.log("error");
			$location.path("/");
			$window.location.href = "/";
		});
	};
});

// Grab XSRF Token
app.factory('XSRFInterceptor', function($cookies, $log) {

	var XSRFInterceptor = {

		request : function(config) {

			var token = $cookies.get('XSRF-TOKEN');

			if (token) {
				config.headers['X-XSRF-TOKEN'] = token;
			}

			return config;
		}
	};
	return XSRFInterceptor;
});

// Bind file to form file input field
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
// //////////////////////////////////////////////////