'use strict';

/* Controllers */
function MainCtrl($scope) {
	$scope.active = true;
	$scope.alohaFormats = ['strong', 'em'];
	$scope.toggleAloha = function () {
		$scope.active = $scope.active ? false : true;
	};
	$scope.$watch('active', function () {
		$scope.classActive = $scope.active ? 'active' : '';
	});

}

