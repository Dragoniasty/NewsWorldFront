'use strict';
var App = angular.module('news-world');
App.factory('ArticleService', ['$http', '$q', function($http, $q){

	return {

			fetchAllArticles: function() {
					return $http.get('http://37.187.52.160:9000/api/article')
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while fetching articles');
										console.errro(errResponse);
										return $q.reject(errResponse);
									}
							);
			},

		    createArticle: function(article){
					return $http.post('http://localhost:46969/api/article', article)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while creating article');
										console.errro(errResponse);
										return $q.reject(errResponse);
									}
							);
		    },

		    updateArticle: function(article, id){
					return $http.put('http://localhost:46969/api/article/'+id, article)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while updating article');
										return $q.reject(errResponse);
									}
							);
			},

			deleteArticle: function(id){
					return $http.get('http://localhost:46969/api/article/delete/'+id)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while deleting article');
										return $q.reject(errResponse);
									}
							);
			}

	};

}]);
