(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:articleTest
	 * @description
	 * # articleTest
	 * Test of the app
	 */

	describe('article test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('news-world');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('ArticleCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
