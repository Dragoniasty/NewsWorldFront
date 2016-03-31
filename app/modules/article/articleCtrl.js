(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:articleCtrl
	 * @description
	 * # articleCtrl
	 * Controller of the app
	 */

	angular
		.module('article')
		.controller('ArticleCtrl', Article);

	Article.$inject = [];

	function Article() {
		var vm = this;
	}

})();
