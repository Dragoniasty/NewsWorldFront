/*!
* news-world - v0.0.1 - MIT LICENSE 2016-03-06. 
* @author Dragoniasty
*/
(function() {
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
		.module('news-world', [
			'ngResource',
			'ngAria',
			'ngMaterial',
			'ngMdIcons',
			'ngCookies',
			'ngAnimate',
			'ngSanitize',
			'ui.router',
			'angularUtils.directives.dirPagination'])
		.controller('ContentCtrl', Content)
		.factory('ContentService', ContentService);


	ContentService.$inject = ['$http'];
	Content.$inject = ['ContentService'];

	function Content(ContentService){
		var vm = this;

		ContentService.getCategories().then(function(data) {
			vm.categories = data;

			vm.categories.forEach(function(category){
				category.id = "$".concat(category.id);
				console.log(category);
				ContentService.getArticles(category.name).then(function(data){
					category.articles = data;
				}, function() {
					$scope.error = 'unable to fetch articles';
				});
			});

		}, function() {
			$scope.error = 'unable to fetch categories';
		});
	}

	function ContentService($http){
		return {
			getCategories: getCategories,
			getArticles: getArticles
		};

		function getCategories(){
			return $http.get('/app/assets/fake_data/categories.json').then(function(response) {
				return response.data.value.content;
			});
		}

		function getArticles(category) {
			var link = "/app/assets/fake_data/";
			link = link.concat(category);
			link = link.concat(".json");
			return $http.get('http://37.187.52.160:9000/api/article?pageSize=20').then(function(response) {
				return response.data.value.content;
			});
		}
	}
})();

(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('news-world')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


		$urlRouterProvider
			.otherwise('/dashboard');

	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

		console.log('AngularJS run() function...');
	}


})();
