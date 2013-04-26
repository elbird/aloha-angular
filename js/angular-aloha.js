'use strict';
var alohaModul = angular.module('aloha', []);

(function (Aloha) {
	alohaModul.directive('alohaEditor', function ($q) {
		var config = {
			active: true
		};

		return {
			restrict: 'EAC',
			scope: {
				alohaActive: '&'
			},
			link: function (scope, element, attrs) {

				console.log(attrs);
				console.log(scope);
				Aloha.ready(function () {
					
					Aloha.jQuery(element.context).aloha();
				});
			}
		};
	});

}(Aloha));
