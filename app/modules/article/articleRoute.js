'use strict';

/**
 * @ngdoc function
 * @name app.route:articleRoute
 * @description
 * # articleRoute
 * Route of the app
 */

angular.module('article')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('home.article', {
				url: '/',
				templateUrl: 'app/modules/article/article-thumb.html',
				controller: 'ArticleCtrl',
				controllerAs: 'vm'
			});


	}]);
