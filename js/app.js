'use strict';

/* App Module */

angular.module('alohaShowcase', ['aloha', 'couchDb']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {controller: MainCtrl})
	.otherwise({redirectTo: '/'});
}]);
