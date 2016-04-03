(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:loginService
	 * @description
	 * # loginService
	 * Service of the app
	 */

  	angular
		.module('login')
		.factory('LoginService', Login);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Login.$inject = ['$http'];

		function Login ($http) {
			return {
				register: register,
				login: login
			};

			function register(credentials) {
				console.log(credentials);
				return $http.post('http://37.187.52.160:9000/register', credentials, {withCredentials: true}).then(function (response) {
					console.log(response);
					return response;
				});
			}

			function login(credentials) {
				return $http.post('http://37.187.52.160:9000/oauth/token', credentials).then(function (response) {
					console.log(response);
					return response;
				});
			}
		}

})();
