module.exports = function(app) {
	app.controller('BeersController', ['$scope', '$http', 'someResource', '$base64', '$location', '$cookies', function($scope, $http, someResource, $base64, $location, $cookies) {
		$scope.beers = [];
		$scope.newBeer =  null;
		$scope.original = {};
		$scope.beersResource = someResource('beers');

		$scope.getAll = function() {
			$scope.beersResource.getAll(function(err, data) {
				if (err) return err;
				$scope.beers = data;
			});
		};

		$scope.create = function(beer) {
			$scope.beersResource.create(beer, function(err, data) {
				if (err) return err;
				$scope.beers.push(data);
				$scope.newBeer =  null;
			});
		};

		$scope.update = function(beer) {
			$scope.beersResource.update(beer, function(err, data) {
				beer.editing = false;
				if (err) return err;
			});
		};

		$scope.delete = function(beer) {
			$scope.beers.splice($scope.beers.indexOf(beer), 1);
			$scope.beersResource.delete(beer, function(err, data) {
				if (err) {
					$scope.getAll();
					return err;
				}
			});
		};

		$scope.deleteUser = function() {
			console.log("yaay delete user ", $scope.beers);
			var removeUser = confirm('Are you sure you want to delete yourself?');
			if (removeUser) {
				$scope.beersResource.deleteUserBeers(null, function(err, data) {
					if (err) return err;
					$scope.beers = data;
					console.log("beer ids inner: ", $scope.beers);
					$scope.beers.forEach(function(beer) {
							$scope.beersResource.delete(beer, function(err, data) {
								if (err) {
								$scope.getAll();
								return err;
							}
						});
					});
				$scope.beersResource.deleteUser();
				$location.path('/sigup');
				});
			}
		};

		$scope.cancel = function(beer) {
			beer.name = $scope.original.name;
			beer.brewery = $scope.original.brewery;
			beer.style =  $scope.original.style;
			beer.notes = $scope.original.notes;
			beer.editing = false;
		};

		$scope.edit = function(beer) {
			$scope.original.name = beer.name;
			$scope.original.brewery = beer.brewery;
			$scope.original.style = beer.style;
			$scope.original.notes = beer.notes;
			beer.editing = true;
		};

	}]);
};
