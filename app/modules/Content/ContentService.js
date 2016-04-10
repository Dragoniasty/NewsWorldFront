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
		.factory('ContentService', ContentService);


	ContentService.$inject = ['$http', '$cookies'];

	function ContentService($http, $cookies) {
		return {
			getCategories: getCategories,
			getArticles: getArticles,
			getFeaturedArticles: getFeaturedArticles,
			getUserCategoriesFromCookie: getUserCategoriesFromCookie,
			putUserCategoriesToCookie: putUserCategoriesToCookie
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

		function getFeaturedArticles() {
			return $http.get('/app/assets/fake_data/featured.json').then(function (response) {
				return response.data.value.content;
			});
		}

		function getUserCategoriesFromCookie() {
			var userCategories = $cookies.getObject("userCategories");
			return userCategories ? userCategories : [];
		}

		function putUserCategoriesToCookie(categories) {
			var kopytko = [];
			categories.forEach(function (category) {
				kopytko.push({name: category.name, id: category.id, imageUrl: category.imageUrl});
			});
			$cookies.putObject('userCategories', kopytko);
		}
	}
})();
