(function () {
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

	Login.$inject = ['LoginService', 'tokenService', '$mdDialog'];

	function Login(LoginService, tokenService, $mdDialog) {
		var vm = this;
		vm.loggedIn = false;
		vm.credentials = {};

		vm.login = login;
		vm.logout = logout;
		vm.openMenu = openMenu;
		vm.register = register;
		vm.showRegisterDialog = showRegisterDialog;

		function openMenu($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
		}

		function login() {
			LoginService.login(vm.credentials).then(function (response) {
					vm.loggedIn = true;
				tokenService.saveTokenToCookie(response.data.value.token);
				}, function () {
				}
			);
		}

		function logout() {

		}

		function register() {
			LoginService.register(vm.credentials).then(function (response) {
			}, function () {

			});
		}

		function showRegisterDialog(ev) {
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
					vm.credent1ials = {};
				}, function () {
					vm.credentials = {};
				});
		}
	}

})();
