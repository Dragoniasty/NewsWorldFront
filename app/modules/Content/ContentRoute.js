/**
 * Created by Jasiek on 18.03.2016.
 */

angular.module('news-world')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider

			.state('content', {
				url: '/content',
				templateUrl: '/app/modules/Content/Content.html',
				controller: 'ContentCtrl',
				controllerAs: 'Content'
			})
			.state('admin', {
				url:'/admin',
				templateUrl: '/app/modules/Content/Admin.html'
			});

	}]);
