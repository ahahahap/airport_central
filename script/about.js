var aboutApp = angular.module('aboutApp',[]);

aboutApp.controller('aboutController', function($scope){
		//Contacts is the parent controller, so 
		//$scope.contacts is available in all children
		$scope.contacts = [
			{name: 'Tom', number: '123'},
			{name: 'Jeffrey', number: '456'},
			{name: 'Natasha', number: '789'}
		];
});

aboutApp.config(function($routeProvider){
		//Configure the routes
		$routeProvider
			//Index Page
			.when('/',{
				//List all contacts
				templateUrl: 'about-content.html',
				controller: 'aboutController'
			});
});
	