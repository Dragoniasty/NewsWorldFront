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

	Article.$inject = ['$mdDialog'];

	function Article($mdDialog) {
		var vm = this;
		vm.showFullArticle = function (ev) {
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
		};
	}

})();
