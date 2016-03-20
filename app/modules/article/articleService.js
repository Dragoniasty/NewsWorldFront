(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:articleService
	 * @description
	 * # articleService
	 * Service of the app
	 */

	angular
		.module('article')
		.factory('ArticleService', Article);
	// Inject your dependencies as .$inject = ['$http', 'someSevide'];
	// function Name ($http, someSevide) {...}

	Article.$inject = ['$http'];

	function Article($http) {

		return {
			getCategories: getCategories,
			getArticles: getArticles,
			getTags: getTags,
			postArticle: postArticle,
			postCategory: postCategory,
			postTag: postTag
		};

		function getCategories() {
			return $http.get('http://37.187.52.160:9000/api/category').then(function (response) {
				return response.data.value;
			});
		}

		function getArticles() {
			return $http.get('http://37.187.52.160:9000/api/article').then(function (response) {
				return response.data.value.content;
			});
		}

		function getTags() {
			return $http.get('http://37.187.52.160:9000/api/tag').then(function (response) {
				return response.data.value;
			});
		}

		function postArticle(article) {
			console.log(article);
			return $http.post('http://37.187.52.160:9000/api/article', article).then(function (response) {
				console.log(response);
				return response;
			});
		}

		function postCategory(category) {
			console.log(category);
			return $http.post('http://37.187.52.160:9000/api/category', category).then(function (response) {
				console.log(response);
				return response;
			});
		}

		function postTag(tag) {
			return $http.post('http://37.187.52.160:9000/api/tag', tag).then(function (response) {
				console.log(response);
				return response;
			});
		}
	}

})();
