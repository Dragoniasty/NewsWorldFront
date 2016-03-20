(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:articleCtrl
	 * @description
	 * # articleCtrl
	 * Controller of the app
	 */

	angular
		.module('article')
		.controller('ArticleCtrl', Article);

	Article.$inject = ['ArticleService'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Article(ArticleService) {
		/*jshint validthis: true */
		var vm = this;

		vm.CategoryToPost = {};
		vm.ArticleToPost = {};
		vm.TagToPost = {};
		vm.tmpTags = [];
		vm.POSTResponse = {};
		vm.ArticleToPost.tagIds = [];

		vm.postArticle = function () {
			vm.tmpTags.forEach(function (tag) {
				if (vm.tags.indexOf(tag.name) === -1) {
					ArticleService.postTag(tag).then(function (data) {
						vm.ArticleToPost.tagIds.push(data.id);
					});
				} else {
					vm.ArticleToPost.tagIds.push(tag.id);
				}
			});
			ArticleService.postArticle(vm.ArticleToPost).then(function (data) {
				vm.articles.push(vm.ArticleToPost);
				vm.ArticleToPost = {};
			});
		};

		vm.postCategory = function () {
			if (vm.categories.indexOf(vm.CategoryToPost.name) === -1) {
				ArticleService.postCategory(vm.CategoryToPost).then(function (data) {
					vm.categories.push(vm.CategoryToPost);
					vm.CategoryToPost = {};
				});
			} else {

			}
		};

		vm.postTag = function () {
			ArticleService.postTag(vm.TagToPost).then(function (data) {
				vm.tags.push(vm.TagToPost);
				vm.TagToPost = {};
			});
		};

		ArticleService.getCategories().then(function (data) {
			vm.categories = data;
		}, function () {
			vm.error = 'unable to fetch categories';
		});

		ArticleService.getTags().then(function (data) {
			vm.tags = data;
		}, function () {
			vm.error = 'unable to fetch tags';
		});

		vm.transformChip = function (chip) {
			if (angular.isObject(chip)) {
				return chip;
			}
			return {name: chip}
		};

		vm.searchTags = function (query) {
			var results = query ? vm.tags.filter(vm.createFilterFor(query)) : [];
			return results;
		};

		vm.createFilterFor = function (query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(tag) {
				return (tag.name.indexOf(lowercaseQuery) === 0);
			};
		};
	}

})();
