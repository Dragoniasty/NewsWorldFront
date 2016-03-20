(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

	angular
		.module('news-world')
		.factory('MenuService', Menu);
	// Inject your dependencies as .$inject = ['$http', 'someSevide'];
	// function Name ($http, someSevide) {...}

	Menu.$inject = ['$http'];

	function Menu($http) {

		var menu = [

			{
				link: 'singlepost',
				name: 'Singlepost'
			},

			{
				link: 'categoryview',
				name: 'Categoryview'
			},

			{
				link: 'content',
				name: 'Content'
			},

			{
				link: 'login',
				name: 'Login'
			},

			{
				link: 'article',
				name: 'Article'
			},

		];

		return {
			listMenu: function () {
				return menu;
			}
		}

	}

})();
