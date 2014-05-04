"use strict";

/**
 * App Controllers
 */

var skyControllers = angular.module('skyControllers', []);

skyControllers.controller('homeController', ['$scope', '$stringHelper',
	function ($scope, $stringHelper) {

		$scope.inputValue = '';
		$scope.user = 'anonymous';
		$scope.convertation = [];

		$scope.addNewMessage = function (newMessage) {
			newMessage = $stringHelper.splitTextByLines(newMessage);
			$scope.convertation.push({ 'sender' : $scope.user, 'text' : newMessage });
			$scope.inputValue = '';
		};

	}]);