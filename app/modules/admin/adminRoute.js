'use strict';

/**
 * @ngdoc function
 * @name app.route:adminRoute
 * @description
 * # adminRoute
 * Route of the app
 */

angular.module('admin')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('home.admin', {
				url: '/admin',
				templateUrl: 'app/modules/admin/admin.html',
				controller: 'AdminCtrl',
				controllerAs: 'vm'
			});


	}]);
