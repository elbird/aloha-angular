'use strict';

function Demo1Ctrl($scope) {
	$scope.curly= {
		open: "{{",
		close: "}}"
	};
	$scope.list = [
		{ content: "ListItem 1"},
		{ content: "ListItem 2"},
		{ content: "ListItem 3"},
		{ content: "ListItem 4"}
	];
}

function Demo2Ctrl($scope) {
	$scope.curly= {
		open: "{{",
		close: "}}"
	};

	$scope.dataBinding = "Awesome 2-way data binding";
}

function Demo3Ctrl($scope, CouchDbService) {
	$scope.curly= {
		open: "{{",
		close: "}}"
	};
	$scope.couch = CouchDbService.query({_id: "index"});
}


/* Controllers */
function AlohaCtrl($scope, CouchDbService) {
	$scope.active = false;
	$scope.alohaConfigHead = {
		formats: ['strong', 'em']
	};
	$scope.alohaConfigBody = {
		formats: ['strong', 'em', 'h3', 'p']
	};
	$scope.couch = CouchDbService.query({_id: "index"});
	$scope.toggleAloha = function () {
		$scope.active = $scope.active ? false : true;
	};
	$scope.save = function () {
		$scope.couch.$save(function () {
			$scope.couch = CouchDbService.query({_id: "index"});
		});
	};
	$scope.$watch('active', function () {
		$scope.classActive = $scope.active ? 'active' : '';
	});
}
