// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('mostPopularListingsApp.home', ['ngRoute'])

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/employees', {
		controller: 'HomeController',
		templateUrl: 'components/views/homeView.html'
	})
	$routeprovider.when('/employees/:uId/edit', {
		controller: 'HomeController',
		templateUrl: 'components/views/homeView.html'
	});
}])

// Controller definition for this module
.controller('HomeController', ['$scope', '$rootScope', 'NgTableParams', 'userService', '$location', function($scope, $rootScope, NgTableParams, userService, $location) {

	// Just a housekeeping.
	// In the init method we are declaring all the
	// neccesarry settings and assignments to be run once
	// controller is invoked

	

	  $scope.checkValidate = function(){
		angular.forEach($rootScope.userData, function(value, key){
		  var isnum = /^\d+$/.test(value.phone);
		  if(!isnum){
			value.phone = 'NA';
		  }
		});
	  }

	  $scope.search = function (row) {
        return (angular.lowercase(row.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
                angular.lowercase(row.address.city).indexOf(angular.lowercase($scope.query) || '') !== -1);
	  };
	  
	  $scope.editRow = function(user, index){
		$scope.editIndex = index;
		$scope.editClicked = true;
		$scope.update.id = user.id;
		$scope.update.name = user.name;
		$scope.update.phone = user.phone;
		$scope.update.address.city = user.address.city;
		$scope.update.address.address_line1 = user.address.address_line1;
		$scope.update.address.address_line2 = user.address.address_line2;
		$scope.update.address.postal_code = user.address.postal_code;
		
		//window.location.href ="#/employees/"+user.id+"/edit";
	  };

	  $scope.updateRow = function(newData){
		$rootScope.userData[$scope.editIndex] = {
			"id": newData.id,
			"name": newData.name ,
			"phone": newData.phone ,
			"address": {
					"city": newData.address.city ,
					"address_line1": newData.address.address_line1 ,
					"address_line2": newData.address.address_line2 ,
					"postal_code": newData.address.postal_code 
				}
			};
		$scope.editClicked = false;
		window.location.href ="#/employees";
	  };

	function init(){
		$scope.update = {};
		$scope.update.address = {};
		if($rootScope.userData && $rootScope.userData.length > 3 ){
			$scope.checkValidate();
			return $rootScope.userData;
		}else if(!$rootScope.userData || $rootScope.userData.length <= 3){
			$rootScope.userData = userService.getUserData();
		}
		$scope.checkValidate();
	};

	init();

}]);