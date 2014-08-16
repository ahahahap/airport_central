var app = angular.module('projectApp',[]);

app.controller('projectController', function($scope){
		$scope.columns =['PROJECT NAME', 'PROJECT NO', 'STATUS'];

		$scope.projects = [
			{name: 'Gutsy Gamma', number: '1373', status: 'In Progress'},
			{name: 'Stormy Hammer', number: '3456', status: 'Completed'},
			{name: 'Moving Lily', number: '7189', status: 'Pending'},
			{name: 'Pluto Discovery', number: '0909', status: 'Pending'},
			{name: 'Screaming Pencil', number: '8453', status: 'Completed'},
			{name: 'Grass Wall', number: '1100', status: 'Suspended'},
			{name: 'Endless Crying', number: '0021', status: 'Completed'},
			{name: 'Planet Happy', number: '2909', status: 'Pending'},
			{name: 'Stainless Tomato', number: '1453', status: 'Completed'},
			{name: 'Rubber Tape', number: '1801', status: 'Suspended'},
			{name: 'Sea Coconut', number: '8021', status: 'Completed'}
		];
});

app.config(function($routeProvider){
		//Configure the routes
		$routeProvider
			//Index Page
			.when('/',{
				//List all contacts
				templateUrl: 'project-content.html',
				controller: 'projectController'
			});
});
	