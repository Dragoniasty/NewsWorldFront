(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:articleCtrl
	 * @description
	 * # articleCtrl
	 * Controller of the app
	 */

	angular
		.module('article')
		.controller('ArticleCtrl', Article);

	Article.$inject = ['$mdDialog', 'ArticleService'];

	function Article($mdDialog, ArticleService) {
		var vm = this;

		vm.like = ArticleService.like;
		vm.dislike = ArticleService.dislike;
		vm.showFullArticle = showFullArticle;

		function showFullArticle(ev) {
			$mdDialog.show({
					locals: {parent: vm},
					controller: angular.noop,
					controllerAs: 'vm',
					bindToController: true,
					templateUrl: '/app/modules/article/article-full.html',
					targetEvent: ev,
					clickOutsideToClose: true
				})
				.then(function () {

				}, function () {

				});
		}
	}

})();
