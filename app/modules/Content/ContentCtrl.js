(function() {
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
		.controller('ContentCtrl', Content);

	Content.$inject = ['ContentService', '$mdSidenav'];

	function Content(ContentService, $mdSidenav){
		var vm = this;

		ContentService.getCategories().then(function(data) {
			vm.categories = data;

			vm.categories.forEach(function(category){
				category.id = "$".concat(category.id);
				console.log(category);
				ContentService.getArticles(category.name).then(function(data){
					category.articles = data;
				}, function() {
					vm.error = 'unable to fetch articles';
				});
			});

		}, function() {
			vm.error = 'unable to fetch categories';
		});

		vm.openLeftMenu = function() {
				$mdSidenav('left').toggle();
			};
	}

})();
