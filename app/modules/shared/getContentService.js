(function () {
	'use strict';

	angular
		.module('news-world')
		.factory('getContentService', getContent);

	getContent.$inject = ['$http', '$httpParamSerializerJQLike'];

	function getContent($http) {

		return {
			getAvailableCategories: getAvailableCategories,
			getArticles: getArticles,
			getAllArticles: getAllArticles,
			getTags: getTags,
			getArticlesFromCategory: getArticlesFromCategory
		};

		function getAvailableCategories() {
			return $http.get('http://37.187.52.160:9000/api/category').then(function (response) {
				return response.data.value;
			});
		}

		function getArticles(pageSize, pageNumber) {
			var requestPage = "?pageSize=".concat(pageSize).concat("&page=").concat(pageNumber);
			return $http.get('http://37.187.52.160:9000/api/article'.concat(requestPage)).then(function (response) {
				return response.data.value.content;
			});
		}

		function getAllArticles() {
			return $http.get('http://37.187.52.160:9000/api/article').then(function (response) {
				return response.data.value.content;
			});
		}

		function getTags() {
			return $http.get('http://37.187.52.160:9000/api/tag').then(function (response) {
				return response.data.value;
			});
		}

		function getArticlesFromCategory(categoryId) {
			return $http.get('http://37.187.52.160:9000/api/category/articles/'.concat(categoryId)).then(function (response) {
				return response.data.value;
			});
		}
	}

})();
