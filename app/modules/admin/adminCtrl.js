(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:adminCtrl
	 * @description
	 * # adminCtrl
	 * Controller of the app
	 */

	angular
		.module('admin')
		.controller('AdminCtrl', Admin);

	Admin.$inject = ['ArticleService', 'getContentService', 'postContentService', '$mdToast'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Admin(ArticleService, getContentService, postContentService, $mdToast) {
		/*jshint validthis: true */
		var vm = this;

		vm.CategoryToPost = {};
		vm.ArticleToPost = {};
		vm.TagToPost = {};
		vm.tmpTags = [];
		vm.POSTResponse = {};
		vm.ArticleToPost.tagIds = [];

		vm.tags = [];
		vm.articles = [];
		vm.categories = [];

		vm.postArticle = function () {
			vm.tmpTags.forEach(function (tag) {
				if (vm.tags.indexOf(tag.name) === -1) {
					console.log(tag);
					postContentService.postTag(tag).then(function (data) {
						vm.ArticleToPost.tagIds.push(data.data.value.id);
						vm.tags.push(data.data.value);
					});
				} else {
					vm.ArticleToPost.tagIds.push(tag.id);
				}
			});
			postContentService.postArticle(vm.ArticleToPost).then(function (data) {
				vm.articles.push(data.data.value);
				vm.ArticleToPost = {};
				vm.showToast("Ohhh YEAH, poszło");
			}, function (data) {
				console.log(data);
				vm.error = 'unable to post article';
				vm.showToast(vm.error);
			});
		};

		vm.postCategory = function () {
			if (vm.categories.indexOf(vm.CategoryToPost.name) === -1) {
				if (vm.categories.indexOf(vm.CategoryToPost.id) != -1) {
					postContentService.putCategory(vm.CategoryToPost).then(function (data) {
						vm.categories[vm.categories.indexOf(vm.CategoryToPost.id)] = data.data.value;
						console.log(data.data.value);
						vm.showToast("Poszedł updejcik");
					});
				}
				else {
					postContentService.postCategory(vm.CategoryToPost).then(function (data) {
						vm.categories.push(data.data.value);
						vm.CategoryToPost = {};
						vm.showToast("Ohhh YEAH, poszło");
					}, function (data) {
						console.log(data);
						vm.error = 'unable to post category';
						vm.showToast(vm.error);
					});
				}
			}
			else {
				vm.error = 'category already exists';
				vm.showToast(vm.error);
			}
		};

		vm.postTag = function () {
			if (vm.tags.indexOf(vm.TagToPost.name) === -1) {
				postContentService.postTag(vm.TagToPost).then(function (data) {
					vm.tags.push(data.data.value);
					vm.TagToPost = {};
					vm.showToast("Ohhh YEAH, poszło");
				}, function (data) {
					console.log(data);
					vm.error = 'unable to post tag';
					vm.showToast(vm.error);
				});
			} else {
				vm.error = 'tag already exists';
				vm.showToast(vm.error);
			}
		};

		getContentService.getCategories().then(function (data) {
			vm.categories = data;
		}, function () {
			vm.error = 'unable to fetch categories';
			vm.showToast(vm.error);
		});

		getContentService.getTags().then(function (data) {
			vm.tags = data;
		}, function () {
			vm.error = 'unable to fetch tags';
			vm.showToast(vm.error);
		});

		vm.setCategoryToPost = function (category) {
			vm.CategoryToPost = category;
			console.log(vm.CategoryToPost);
		};
		
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

		vm.showToast = function (text) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(text)
					.hideDelay(3000)
					.position("top right")
			)
		};
	}

})();
