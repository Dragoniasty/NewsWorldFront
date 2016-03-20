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


	ContentService.$inject = ['$http'];

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
