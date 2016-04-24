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

	configure.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$cookiesProvider'];

	function configure($urlRouterProvider, $locationProvider, $httpProvider, $cookiesProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

		$urlRouterProvider
			.otherwise('/content');

		var date = Date.now();
		date = date + 31536000;
		$cookiesProvider.defaults.expires = date;
	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

		console.log('AngularJS run() function...');
	}


})();
