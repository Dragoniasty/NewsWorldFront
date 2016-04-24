(function () {
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
		.controller('ContentCtrl', Content)
		.directive('heightExtractor', HeightExtractor);

	Content.$inject = ['getContentService', 'ContentService', '$mdSidenav', 'parallaxHelper', '$mdMenu'];

	function Content(getContentService, ContentService, $mdSidenav, parallaxHelper, $mdMenu) {
		var vm = this;
		vm.categories = [];
		vm.userCategories = [];
		vm.editMode = false;
		vm.availableCategories = [];
		vm.userCategories = ContentService.getUserCategoriesFromCookie();

		vm.categories = vm.userCategories;

		vm.userCategories.forEach(function (category) {
			category.showFilters = false;
			getContentService.getArticlesFromCategory(category.id).then(function (data) {
				category.articles = data;
			}, function () {
				vm.error = 'unable to fetch articles'
			});

		});

		vm.getAvailableCategories = function () {
			getContentService.getAvailableCategories().then(function (data) {
				vm.availableCategories = data;
				vm.userCategories.forEach(function (category) {

					for (var i = 0; i < vm.availableCategories.length; i++) {
						if (vm.availableCategories[i].id === category.id) {
							vm.availableCategories.splice(i, 1);
						}
					}
				});

				console.log(vm.availableCategories);
			}, function () {
				vm.error = 'unable to fetch categories';
			});
		};

		vm.openMenu = function ($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
		};

		vm.background = parallaxHelper.createAnimator(-0.4, 5000, -screen.availHeight, screen.availHeight);

		vm.fadeIn = function (elementPosition) {
			var factor = -0.0043;
			var opacity = Math.min((elementPosition.elemY) * factor, 1.0);
			return {
				opacity: opacity
			}
		};

		vm.toggleEditMode = function () {
			vm.editMode = !vm.editMode;
			vm.getAvailableCategories();
		};


		vm.openLeftMenu = function () {
			$mdSidenav('left').toggle();
		};

		vm.toggleFilters = function (category) {
			category.showFilters = !category.showFilters;
		};

		vm.dragControlListeners = {
			accept: function (sourceItemHandleScope, destSortableScope) {
				return true
			},
			itemMoved: function (event) {
			},
			orderChanged: function (event) {
				ContentService.putUserCategoriesToCookie(vm.userCategories);
			}
		};

		vm.searchCategories = function (query) {
			var results = query ? vm.availableCategories.filter(vm.createFilterFor(query)) : vm.availableCategories;
			return results;
		};

		vm.createFilterFor = function (query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(category) {
				return (category.name.indexOf(query) === 0);
			};
		};

		vm.addUserCategory = function (category) {
			if (vm.searchText != "") {
				vm.searchText = "";
				vm.userCategories.push(category);

				getContentService.getArticlesFromCategory(category.id).then(function (data) {
					category.articles = data;
				}, function () {
					vm.error = 'unable to fetch articles'
				});
				var index = vm.availableCategories.indexOf(category);
				vm.availableCategories.splice(index, 1);
				ContentService.putUserCategoriesToCookie(vm.userCategories);
				$mdMenu.hide()
			}
		};

		vm.removeUserCategory = function (categoryIdx) {
			vm.availableCategories.push(vm.userCategories[categoryIdx]);
			vm.userCategories.splice(categoryIdx, 1);
			ContentService.putUserCategoriesToCookie(vm.userCategories);
		};

	}

	function HeightExtractor($timeout) {
		return {
			restrict: 'A',
			link: function (scope, el) {
				$timeout(getHeight, 500, true);

				function getHeight() {
					scope.height = el[0].offsetHeight + screen.availHeight;
					scope.height = String(scope.height).concat('px');
				}

			}
		}
	}


})();
