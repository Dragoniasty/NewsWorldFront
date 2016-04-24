(function () {
	'use strict';

	angular
		.module('news-world')
		.factory('tokenService', token);

	token.$inject = ['$http', '$httpParamSerializerJQLike', '$cookies'];

	function token($http, $httpParamSerializerJQLike, $cookies) {

		return {
			saveTokenToCookie: saveTokenToCookie,
			getTokenFromCookie: getTokenFromCookie
		};

		function saveTokenToCookie(token) {
			var date = new Date();
			date.setDate(date.getDate() + 30);

			$cookies.putObject('token', token, {expires: date});
		}

		function getTokenFromCookie() {
			var token = $cookies.getObject("token");
			return token ? token : {};
		}
	}

})();
