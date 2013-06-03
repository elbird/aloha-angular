'use strict';

/* Controllers */
function MainCtrl($scope, CouchDbService) {
	$scope.active = true;
	$scope.alohaConfig = {
		formats: ['strong', 'em']
	};
	$scope.indexContent = CouchDbService.query({_id: "index"});
	$scope.toggleAloha = function () {
		$scope.active = $scope.active ? false : true;
	};
	$scope.save = function () {
		$scope.indexContent.$save(function () {
			$scope.indexContent = CouchDbService.query({_id: "index"});
		});
	};
	$scope.$watch('active', function () {
		$scope.classActive = $scope.active ? 'active' : '';
	});

}

