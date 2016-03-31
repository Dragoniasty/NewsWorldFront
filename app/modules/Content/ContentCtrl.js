(function () {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main modules of the application.
	 */

	angular
		.module('news-world')
		.controller('ContentCtrl', Content)
		.directive('heightExtractor', HeightExtractor);

	Content.$inject = ['ContentService', '$mdSidenav', 'parallaxHelper'];

	function Content(ContentService, $mdSidenav, parallaxHelper) {
		var vm = this;

		vm.background = parallaxHelper.createAnimator(-0.4, 5000, -screen.availHeight, screen.availHeight);

		vm.fadeIn = function (elementPosition) {
			var factor = -0.0043;
			var opacity = Math.min((elementPosition.elemY) * factor, 1.0);
			return {
				opacity: opacity
			}
		};


		ContentService.getCategories().then(function (data) {
			vm.categories = data;

			console.log(data);
			vm.categories.forEach(function (category) {
				ContentService.getArticles(category.name).then(function (data) {

					category.articles = data;
				}, function () {
					vm.error = 'unable to fetch articles';
				});
			});

		}, function () {
			vm.error = 'unable to fetch categories';
		});

		vm.openLeftMenu = function () {
			$mdSidenav('left').toggle();
		};
	}

	function HeightExtractor($timeout) {
		return {
			restrict: 'A',
			link: function (scope, el) {
				$timeout(getHeight, 200, true);

				function getHeight() {
					scope.height = el[0].offsetHeight + screen.availHeight;
					scope.height = String(scope.height).concat('px');
				}

			}
		}
	}
})();
