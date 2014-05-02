"use strict";

/**
 * App Controllers
 */

var skyControllers = angular.module('skyControllers', []);

skyControllers.controller('homeController', ['$scope', 
	function ($scope) {

		$scope.inputValue = '';

		$scope.setViewValue = function (textData) {
			$scope.inputValue = textDatal
		};

	}]);