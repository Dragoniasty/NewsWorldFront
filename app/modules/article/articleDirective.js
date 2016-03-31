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
		.module('article')
		.directive('article', article);

	function article() {
		return {
			restrict: 'E',
			scope: {},
			controller: 'ArticleCtrl',
			controllerAs: 'vm',
			bindToController: {
				article: '='
			},
			templateUrl: '/app/modules/article/article-thumb.html'
		}
	}
})();
