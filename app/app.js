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

	var App = angular
		.module('news-world', [
			'ngResource',
			'ngAria',
			'ngMaterial',
			'ngMdIcons',
			'ngCookies',
			'ngAnimate',
			'ngSanitize',
			'ui.router',
			'angularUtils.directives.dirPagination'])
		.controller('ContentCtrl', Content)
		.factory('ContentService', ContentService);

	ContentService.$inject = ['$http'];
	Content.$inject = ['ContentService'];

	function Content(ContentService){
		var vm = this;

		ContentService.getCategories().then(function(data) {
			vm.categories = data;

			vm.categories.forEach(function(category){
				category.id = "$".concat(category.id);
				console.log(category);
				ContentService.getArticles(category.name).then(function(data){
					category.articles = data;
				}, function() {
					$scope.error = 'unable to fetch articles';
				});
			});

		}, function() {
			$scope.error = 'unable to fetch categories';
		});
	}


	function ContentService($http){
		return {
			getCategories: getCategories,
			getArticles: getArticles
		};

		function getCategories(){
			return $http.get('/app/assets/fake_data/categories.json').then(function(response) {
				return response.data.value.content;
			});
		}

		function getArticles(category) {
			var link = "/app/assets/fake_data/";
			link = link.concat(category);
			link = link.concat(".json");
			return $http.get(link).then(function(response) {
				return response.data.value.content;
			});
		}
	}
})();
