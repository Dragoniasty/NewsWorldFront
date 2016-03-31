(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:adminTest
	 * @description
	 * # adminTest
	 * Test of the app
	 */

	describe('admin test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('news-world');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('AdminCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
