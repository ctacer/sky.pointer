"use strict";

/**
 * App helper module
 */

var helper = angular.module('skyHelper', []);

helper.value('$stringHelper', {

	'splitTextByLines' : function (str) {
		var res = str.replace(/[\r\n]/g, '\n').split('\n');
		return res.filter(function (element) {
			return element.length > 0;
		});
	}
	
});