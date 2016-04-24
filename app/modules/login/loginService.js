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

	Login.$inject = ['$http', '$httpParamSerializerJQLike'];

	function Login($http, $httpParamSerializerJQLike) {
			return {
				register: register,
				login: login
			};

			function register(credentials) {
				return $http.get('http://37.187.52.160:9000/api/register?'.concat($httpParamSerializerJQLike(credentials))).then(function (response) {
					console.log(response);
					return response;
				});
			}

			function login(credentials) {
				return $http.get('http://37.187.52.160:9000/api/login?'.concat($httpParamSerializerJQLike(credentials))).then(function (response) {
					console.log(response);
					return response;
				});
			}
		}

})();
