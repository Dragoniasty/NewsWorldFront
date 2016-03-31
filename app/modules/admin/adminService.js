(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:adminService
	 * @description
	 * # adminService
	 * Service of the app
	 */

	angular
		.module('admin')
		.factory('AdminService', Admin);
	// Inject your dependencies as .$inject = ['$http', 'someSevide'];
	// function Name ($http, someSevide) {...}

	Admin.$inject = ['$http'];

	function Admin($http) {

	}

})();
