'use strict';

/**
 * @ngdoc function
 * @name app.route:articleRoute
 * @description
 * # articleRoute
 * Route of the app
 */

angular.module('news-world')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('content', {
				url: '/content',
				templateUrl: '/app/modules/Content/Content.html',
				controller: 'ContentCtrl',
				controllerAs: 'Content'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '/app/modules/admin/admin.html'
			});


	}]);
