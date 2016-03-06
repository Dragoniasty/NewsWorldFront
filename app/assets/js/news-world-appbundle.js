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
			'ui.router',])
		.controller('CategoryCtrl', Category)
		.factory('CategoryService', CategoryService);

	CategoryService.$inject = ['$http'];

	function Category(CategoryService){
		var vm = this;
		vm.articles = CategoryService.getArticles();
	}

	function CategoryService($http){
		return {
			getArticles: getArticles
		};

		function getArticles() {
			$http.get("http://37.187.52.160:9000/api/article").success(function(response){
				return response.value
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
