
(function (ng) {
	'use strict';

	var app = ng.module('ngLoadScript', []);

	app.directive('script', function () {
		return {
			restrict: 'E',
			scope: false,
			link: function (scope, elem, attr) {
				if (attr.type === 'text/javascript-lazy') {
					var s = document.createElement("script");
					s.type = "text/javascript";
					var src = elem.attr('src');
					if (src !== undefined) {
						s.src = src;
					}
					else {
						var code = elem.text();
						s.text = code;
					}
					elem.parent().append(s);
					elem.remove();
				}
			}
		};
	});

} (angular));


// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngLoadScript']);

// configure our routes
scotchApp.config(function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		
		$routeProvider

		// route for the home page
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})

		// route for the about page
		.when('/about', {
			templateUrl: 'pages/about.html',
			controller: 'aboutController'
		})

		// route for the contact page
		.when('/contact', {
			templateUrl: 'pages/contact.html',
			controller: 'contactController'
		});
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function ($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('aboutController', function ($scope) {
		$scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function ($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
});