'use strict';
var alohaModul = angular.module('aloha', []);

(function (Aloha) {
	var pluginContext = this;
	Aloha.settings = Aloha.settings || {};
	Aloha.settings.plugins = Aloha.settings.plugins || {};
	Aloha.settings.plugins.format = {
		config : [ 'strong', 'em', 'b', 'i', 'del', 'sub', 'sup', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat'],
		editables: {}
	};
	alohaModul.directive('aloha', function ($q) {
		var count = 0,
			config = {
				active: true
			};
		function alohaElement(element) {
			Aloha.ready(function () {
				Aloha.jQuery(element.context).aloha();
			});
		}
		function mahaloElement(element) {
			Aloha.ready(function () {
				Aloha.jQuery(element.context).mahalo();
			});
		}

		return {
			terminal: true,
			priority: -1000,
			restrict: 'EAC',
			scope: {
				alohaActive: '=',
				alohaConfig: '=',
				alohaContent: '='
			},
			link: function (scope, element, attrs) {
				var elementId = "" + count++,
					uniqeClass = "angular-aloha-element" + elementId,
					config = {};
				element[0].classList.add(uniqeClass);
				element.data("ng-aloha-element-id", elementId);
				if (scope.alohaConfig) {
					config = scope.alohaConfig
					if (config.formats && config.formats.length && config.formats.length > 0) {
						Aloha.settings.plugins.format.editables['.' + uniqeClass] = config.formats;
					}
				}
				if (scope.alohaActive) {
					alohaElement(element);
				}
				scope.$watch('alohaContent', function(newValue, oldValue) {
					if (Aloha.activeEditable && Aloha.activeEditable.obj.data("ng-aloha-element-id") === elementId) {
						return;
					}
					element.html(newValue);
				});
				scope.$watch('alohaActive', function(newValue, oldValue) {
					if (oldValue === newValue) {
						return;
					}
					if (newValue) {
						alohaElement(element);
					} else {
						mahaloElement(element);
					}
				});
				Aloha.bind('aloha-smart-content-changed', function(jEvent, jData) {
					if (jData.editable.obj.data("ng-aloha-element-id") === elementId) {
						scope.alohaContent = jData.editable.getContents();
						scope.$apply();
					}
				});
			}
		};
	});
}(Aloha));
