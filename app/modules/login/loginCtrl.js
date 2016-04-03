(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:loginCtrl
	* @description
	* # loginCtrl
	* Controller of the app
	*/

  	angular
		.module('login')
		.controller('LoginCtrl', Login);

	Login.$inject = ['LoginService', '$mdDialog'];

	function Login(LoginService, $mdDialog) {
			var vm = this;
		vm.loggedIn = false;
		vm.credentials = {};

		vm.openMenu = function ($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
		};

		vm.login = function () {
			LoginService.login(vm.credentials).then(function (response) {
					console.log(response);
					vm.loggedIn = true;
				}, function () {
				}
			);
		};

		vm.logout = function () {

		};

		vm.register = function () {
			LoginService.register(vm.credentials).then(function (response) {
				console.log(response);
			}, function () {

			});
		};

		vm.showRegisterDialog = function (ev) {
			$mdDialog.show({
					locals: {parent: vm},
					controller: angular.noop,
					controllerAs: 'vm',
					bindToController: true,
					templateUrl: '/app/modules/login/register.html',
					targetEvent: ev,
					clickOutsideToClose: true
				})
				.then(function () {
					vm.credentials = {};
				}, function () {
					vm.credentials = {};
				});
		};
		}

})();
