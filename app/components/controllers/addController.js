// AboutController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('mostPopularListingsApp.about', ['ngRoute'])

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/employees/add', {
		controller: 'addController',
		templateUrl: 'components/views/addRow.html'
	});
}])

// Controller definition for this module
.controller('addController', ['$scope', '$rootScope', 'userService', function($scope, $rootScope, userService) {

	// Just a housekeeping.
	// In the init method we are declaring all the
	// neccesarry settings and assignments to be run once
	// controller is invoked

	$scope.appendRow = function(data){
		if(data.name && data.phone){
				$rootScope.userData.push({
					"id": data.id || '-',
					"name": data.name || '-',
					"phone": data.phone || '-',
					"address": {
					  "city": data.address.city || '-',
					  "address_line1": data.address.address_line1 || '-',
					  "address_line2": data.address.address_line2 || '-',
					  "postal_code": data.address.postal_code || '-'
					}
				  })
				  window.location.href ="#/employees";
		}else{
			alert('please fill atleast 1 field.');
		}
		
	};

	init();

	function init(){
	
	};

	this.message = "Hello About!";

}]);