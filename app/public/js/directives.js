"use strict";

/**
 * App directives;
 */

var skyDirectives = angular.module('skyDirectives', []);

skyDirectives.directive('myInputValidator', function () {
	return {
		'restrict' : "A",
		'require' : "?ngModel",
		'link' : function (scope, element, attrs, ngModel) {
			if (!ngModel) return;

			var readInputText = function () {
				var html = element.val();

				return html;
			};

			var render = function () {
				ngModel.$setViewValue(readInputText());
			};

      ngModel.$render = function () {
          element.val(ngModel.$viewValue || '');
      };

			element.on('blur change keyup', function (event) {
				scope.$apply(render);

				if (event.keyCode == 13 && !event.shiftKey) {
					scope.$apply(function () {
						scope.addNewMessage(readInputText());
					});					
				}
			});			

		}
	};
});