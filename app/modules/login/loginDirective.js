(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:articleModule
	 * @description
	 * # articleModule
	 * Module of the app
	 */

	angular
		.module('login')
		.directive('login', login);

	function login() {
		return {
			restrict: 'E',
			scope: {},
			controller: 'LoginCtrl',
			controllerAs: 'vm',
			templateUrl: '/app/modules/login/login.html'
		}
	}
})();
