(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	$scope.items = "";
	$scope.message = "hello";

	$scope.displayMessage = function () {
		var message = checkItems($scope.items);
		$scope.message = message;
	};

	function checkItems(string) {
		var x = string.split(',');
		console.log(x);
		if (x.length == 0) {
			return "Please enter data first";
		} else if(x.length > 3){
			return "Too much!";
		}else{
			return "Enjoy!";
		}
	}
}
	
})();