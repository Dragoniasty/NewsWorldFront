(function () {
	'use strict';

	angular
		.module('news-world')
		.factory('postContentService', postContent);

	postContent.$inject = ['$http', '$httpParamSerializerJQLike'];

	function postContent($http, $httpParamSerializerJQLike) {

		return {
			postArticle: postArticle,
			postCategory: postCategory,
			postTag: postTag,
			putArticle: putArticle,
			putCategory: putCategory
		};

		function postArticle(article) {
			return $http.post('http://37.187.52.160:9000/api/article', $httpParamSerializerJQLike(article)).then(function (response) {
				console.log(response);
				return response;
			});
		}

		function postCategory(category) {
			return $http.post('http://37.187.52.160:9000/api/category', $httpParamSerializerJQLike(category)).then(function (response) {
				console.log(response);
				return response;
			});
		}

		function postTag(tag) {
			return $http.post('http://37.187.52.160:9000/api/tag', $httpParamSerializerJQLike(tag)).then(function (response) {
				console.log(response);
				return response;
			});
		}

		function putArticle(article) {
			return $http.put('http://37.187.52.160:9000/api/article', $httpParamSerializerJQLike(article)).then(function (response) {
				console.log(response);
				return response;
			});
		}

		function putCategory(category) {
			return $http.put('http://37.187.52.160:9000/api/category', $httpParamSerializerJQLike(category)).then(function (response) {
				console.log(response);
				return response;
			});
		}
	}
})();
