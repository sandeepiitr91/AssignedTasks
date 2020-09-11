/**
 * @ngdoc User Dashboard
 * @name dashboardApp
 * @description This module handle data in data-table structure, it provide
 *              searching, sorting by column and limit record etc.
 */
var myapp = angular.module("myapp", [])
myapp.controller('DashboardController', [
		'$scope',
		"$http",
		function($scope,$http) {
			$scope.dashboard = [ {
				
			];
			// Initializing the reverse property = false;
			$scope.reverse =false
			// Initializing the defaultSearchField
			$scope.searchField =undefined;
			// Initializing the results with all datavalue by default
			$scope.results = $scope.dashboard;

			/*
			 * Method Sort filters the results by given field name as parameter.
			 */
			$scope.Sort = function(fieldName) {
				/*$scope.searchField = fieldName*/
				$scope.results = $filter('orderBy')($scope.dashboard,
						/*$scope.searchField*/fieldName, $scope.reverse)
				if ($scope.searchField === fieldName && $scope.reverse) {
					$scope.reverse = $scope.reverse;
				} else {
					$scope.reverse = !$scope.reverse;
				}
			}
			/*
			 * Method isSortUp returns true if the order of the sort is true
			 */
		/*	$scope.isSortUp = function() {
				return $scope.reverse
			}
			/*
			 * Method isSortUp returns true if the order of the sort is false
			 */
			/*$scope.isSortDown = function() {
				return !$scope.reverse
			}*/
		} ]);