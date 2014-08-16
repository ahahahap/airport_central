var app = angular.module('airportApp',[]);

app.config(function($routeProvider){
		//Configure the routes
		$routeProvider
			//Index Page
			.when('/',{
				//List all contacts
				templateUrl: 'home.html',
				controller: 'airportController'
			});
});

//HOME CONTROLLER
app.controller('airportController', function ($scope, $http, $filter) {
	var date = new Date();
	var currHour = date.getHours();
	var currDate = date.getDate();
	var currMonth = date.getMonth() + 1;
	var currYear = date.getFullYear();
	console.log("Current Date: " + currDate + ", Current Month: " + currMonth + ": currentYear = " + currYear + " and currHour = " + currHour);
  	 
  	var url = "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/airport/status/YVR/arr/"+ currYear + "/" + currMonth + "/"+ currDate +"/" + currHour + "?appId=8e5aec87&appKey=ed34be983e971cafe903e442f4bf630e&utc=false&numHours=1&maxFlights=10&callback=JSON_CALLBACK";
  	var url4 = "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/airport/status/YVR/arr/2014/7/20/8?appId=8e5aec87&appKey=ed34be983e971cafe903e442f4bf630e&utc=false&numHours=1&callback=JSON_CALLBACK";


	  $scope.flights = [];
	  $scope.flighttrackers = [];
	  $scope.arrivalTime = [];
	  $scope.columns = [ 'ARRIVAL TIME', 'ARRIVING FROM', 'AIRLINES' ];
	  // Default orderBy
	  $scope.orderBy = $scope.columns[0];

	  $http.jsonp(url).success(function(response){
	  	console.log(response);
	    $scope.flighttrackers= response.flightStatuses;
	    //$scope.arrivalTime = response.flightStatuses.arrivalDate;
	  }).error(function(error) {
	         console.log(JSON.stringify(error));
	  });
});


