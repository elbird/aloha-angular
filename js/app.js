'use strict';

/* App Module */

angular.module('alohaShowcase', ['aloha', 'couchDb']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/Demo/1', {controller: Demo1Ctrl, templateUrl: 'partials/Demo1.html'})
	.when('/Demo/2', {controller: Demo2Ctrl, templateUrl: 'partials/Demo2.html'})
	.when('/Demo/3', {controller: Demo3Ctrl, templateUrl: 'partials/Demo3.html'})
	.when('/Demo/Aloha', {controller: AlohaCtrl, templateUrl: 'partials/Aloha.html'})
	.otherwise({redirectTo: '/Demo/1'});
}]);
