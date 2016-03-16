'use strict';

var App = angular.module('news-world');

App.controller('ArticleController', ['$scope', 'ArticleService', function($scope, ArticleService) {
          var self = this;
          self.article={id:null,title:'',text:'',link:''};
          self.articles=[];

          self.fetchAllArticles = function(){
              ArticleService.fetchAllArticles()
                  .then(
      					       function(d) {
      						        self.articles = d;
      					       },
            					function(errResponse){
            						console.error('Error while fetching Currencies');
            					}
      			       );
          };

          self.createArticle = function(article){
              ArticleService.createArticle(article)
		              .then(
                      self.fetchAllArticles,
				              function(errResponse){
					               console.error('Error while creating Article.');
				              }
                  );
          };

         self.updateArticle = function(article, id){
              ArticleService.updateArticle(article, id)
		              .then(
				              self.fetchAllArticles,
				              function(errResponse){
					               console.error('Error while updating Article.');
				              }
                  );
          };

         self.deleteArticle = function(id){
              ArticleService.deleteArticle(id)
		              .then(
				              self.fetchAllArticles,
				              function(errResponse){
					               console.error('Error while deleting Article.');
				              }
                  );
          };

          self.fetchAllTags = function(){
              ArticleService.fetchAllTags()
                  .then(
                       function(d) {
                          self.articles = d;
                       },
                      function(errResponse){
                        console.error('Error while fetching Currencies');
                      }
                   );
          };

          self.fetchAllArticles();

          self.submit = function() {
              if(self.article.id===null){
                  console.log('Saving New Article', self.article);
                  self.createArticle(self.article);
              }else{
                  self.updateArticle(self.article, self.article.id);
                  console.log('Article updated with id ', self.article.id);
              }
          };

          self.edit = function(id){
              console.log('id to be edited', id);
              for(var i = 0; i < self.articles.length; i++){
                  if(self.articles[i].id === id) {
                     self.article = angular.copy(self.articles[i]);
                     break;
                  }
              }
          };

          self.remove = function(id){
              console.log('id to be deleted', id);
              if(self.article.id === id) {//clean form if the article to be deleted is shown there.
                 self.reset();
              }
              self.deleteArticle(id);
          };


      }]);
