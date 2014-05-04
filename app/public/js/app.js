"use strict";

/**
 * Angular main module
 */

var skyApp = angular.module('skyPointer', [
	'ngRoute', 
	'skyControllers',
	'skyDirectives',
	'skyHelper'
]);

skyApp.config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl : 'partials/home-template.html',
				controller : 'homeController'
			}).
			otherwise({
        redirectTo: '/'
      });		
	}]);