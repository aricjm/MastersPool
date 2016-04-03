var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	console.log($scope);
	console.log($scope.entrylist);
	//Visibility
	$scope.homePageHide = false;
	$scope.rulesPageHide = true;
	$scope.adminPageHide = true;
	$scope.confirmSubmitHide = true;


	$scope.showConfirmSubmit = function() {
		$scope.confirmSubmitHide = false;
	};

	$scope.hideConfirmSubmit = function() {
		$scope.confirmSubmitHide = true;
	};

	$scope.validateAddEntry = function() {
		if(($scope.entry.firstName != null || $scope.entry.firstName != undefined)
			&& ($scope.entry.lastName != null || $scope.entry.lastName != undefined) 
			&& ($scope.entry.entryName != null || $scope.entry.entryName != undefined)
			&& ($scope.entry.tierOneGolfer != null || $scope.entry.tierOneGolfer != undefined)
			&& ($scope.entry.tierTwoGolfer != null || $scope.entry.tierTwoGolfer != undefined)
			&& ($scope.entry.tierThreeGolfer != null || $scope.entry.tierThreeGolfer != undefined)
			&& ($scope.entry.tierFourGolfer != null || $scope.entry.tierFourGolfer != undefined)
			&& ($scope.entry.tierFiveGolfer != null || $scope.entry.tierFiveGolfer != undefined)
			&& ($scope.entry.tierSixGolfer != null || $scope.entry.tierSixGolfer != undefined)) {
			var valid = true;
			for (i in $scope.entrylist) {
				if($scope.entry.entryName == $scope.entrylist[i].entryName){
					valid = false;
				}
			}
			if(valid){
				$scope.addEntry();
				$scope.hideConfirmSubmit();
			} else{
				alert("Entry name is already in use. Use different entry name.");
				$scope.hideConfirmSubmit();
			}	
		} else {
			alert("Please fill out all fields!");
		}
	};


	$scope.showHomePage = function() {
		$scope.homePageHide = false;
		$scope.rulesPageHide = true;
		$scope.adminPageHide = true;
	};

	$scope.showRulesPage = function() {
		$scope.homePageHide = true;
		$scope.rulesPageHide = false;
		$scope.adminPageHide = true;
	};

	$scope.showAdminPage = function() {
		$scope.homePageHide = true;
		$scope.rulesPageHide = true;
		$scope.adminPageHide = false;
		$scope.loginAdminHide = false;
		$scope.mainAdminHide = true;
	};

	$scope.loginToAdmin = function() {
		if ($scope.adminPassword == "t") { 
			$scope.loginAdminHide = true;
			$scope.mainAdminHide = false;
		} else {
			$scope.adminPassword = "";
		}
	};

	$scope.calcTotal = function() {
		return parseInt(golfer.dayFourScore);
	};


	var refreshGolfer = function() {
		$http.get('/golferlist').success(function(response) {
			console.log("I got the data I requested");
			$scope.golferlist = response;
			$scope.golfer = "";

			for(i in $scope.golferlist) {
				$scope.golferlist[i].total = $scope.golferlist[i].dayOneScore + $scope.golferlist[i].dayTwoScore + $scope.golferlist[i].dayThreeScore + $scope.golferlist[i].dayFourScore;
			};
		});
	};

	refreshGolfer();

	$scope.addGolfer = function() {
		console.log($scope.golfer);
		$http.post('/golferlist', $scope.golfer).success(function(response) {
			console.log(response);
			refreshGolfer();
		});
	};

	$scope.removeGolfer = function(id) {
		console.log(id);
		$http.delete('/golferlist/' + id).success(function(response) {
			refreshGolfer();
		});
	};
	
	$scope.editGolfer = function(id) {
		console.log(id);
		$http.get('/golferlist/' + id).success(function(response) {
			$scope.golfer = response;
		});
	};

	$scope.updateGolfer = function() {
		console.log($scope.golfer._id);
		$http.put('/golferlist/' + $scope.golfer._id, $scope.golfer).success(function(response) {
			refreshGolfer();
		});
	};

	$scope.deselectGolfer = function() {
		$scope.golfer = "";
	};




	var refreshEntry = function() {
		$http.get('/entrylist').success(function(response) {
			console.log("I got the data I requested");
			$scope.entrylist = response;
			$scope.entry = "";

			// //Set Totals
			for(index in $scope.entrylist) {
				$scope.entrylist[index].total = $scope.entrylist[index].tierOneGolfer.total + $scope.entrylist[index].tierTwoGolfer.total + $scope.entrylist[index].tierThreeGolfer.total + $scope.entrylist[index].tierFourGolfer.total + $scope.entrylist[index].tierFiveGolfer.total + $scope.entrylist[index].tierSixGolfer.total;
				$scope.entrylist[index].best4 = null;
				var bestFour = [];
				bestFour.push($scope.entrylist[index].tierOneGolfer.total);
				bestFour.push($scope.entrylist[index].tierTwoGolfer.total);
				bestFour.push($scope.entrylist[index].tierThreeGolfer.total);
				bestFour.push($scope.entrylist[index].tierFourGolfer.total);
				bestFour.push($scope.entrylist[index].tierFiveGolfer.total);
				bestFour.push($scope.entrylist[index].tierSixGolfer.total);
				bestFour.sort(); 
				for (score in bestFour) {
					if (score < 4){
						$scope.entrylist[index].best4 = $scope.entrylist[index].best4 + bestFour[score];
					}
				}


			};
		});
	};

	refreshEntry();

	$scope.addEntry = function() {
		console.log($scope.entry);
		$scope.entry.isPaid = false;
		$http.post('/entrylist', $scope.entry).success(function(response) {
			console.log(response);
			refreshEntry();
		});
	};

	$scope.removeEntry = function(id) {
		console.log(id);
		$http.delete('/entrylist/' + id).success(function(response) {
			refreshEntry();
		});
	};
	
	$scope.editEntry = function(id) {
		console.log(id);
		$http.get('/entrylist/' + id).success(function(response) {
			$scope.entry = response;
		});
	};

	$scope.updateEntry = function() {
		console.log($scope.entry._id);
		$http.put('/entrylist/' + $scope.entry._id, $scope.entry).success(function(response) {
			refreshEntry();
		});
	};

	$scope.deselectEntry = function() {
		$scope.entry = "";
	};

	console.log($scope);

}]);