/**
 * Created by Jasiek on 18.03.2016.
 */

angular.module('news-world')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('home.content', {
				url: '/content',
				templateUrl: 'app/modules/Content/Content.html',
				controller: 'ContentCtrl',
				controllerAs: 'vm'
			});

	}]);
