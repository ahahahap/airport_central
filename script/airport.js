var app = angular.module('airportApp',[])
app.factory('flightSearch', ['$http', function($http){
	

}]);

var ValidSubmit = ['$parse', function ($parse) {
    return {
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                post: function postLink(scope, element, iAttrs, controller) {
                    var form = element.controller('form');
                    form.$submitted = false;
                    var fn = $parse(iAttrs.validSubmit);
                    element.on('submit', function(event) {
                        scope.$apply(function() {
                            element.addClass('ng-submitted');
                            form.$submitted = true;
                            if(form.$valid) {
                                fn(scope, {$event:event});
                            }
                        });
                    });
                    scope.$watch(function() { return form.$valid}, function(isValid) {
                        if(form.$submitted == false) return;
                        if(isValid) {
                            element.removeClass('has-error').addClass('has-success');
                        } else {
                            element.removeClass('has-success');
                            element.addClass('has-error');
                        }
                    });
                }
            }
        }
    }
}]
app.directive('validSubmit', ValidSubmit);



app.controller('airportController', function ($scope, $http, $filter) {
	
	var ie = false;
	var mobileDevice = false;
	var smallDevice = false;
	var androidDevice = false;
	var androidPhone = false;
	var androidTablet = false;
	var iPhone = false;
	var winPhone = false;
	var blackberryTable = false;
	var blackberryPhone = false;
	var tabletPortrait = false;
	var galaxyNoteThreeLandScape = false;
	var galaxyNoteThreePortrait = false;

	var deviceHeight = $(window).height();
	var deviceWidth = $(window).width();


	if (navigator.appName == 'Microsoft Internet Explorer') { 
	    ie = true;	
		var e = ("article,aside,figcaption,figure,footer,header,hgroup,nav,section,time").split(',');
		for (var i = 0; i < e.length; i++) {
			document.createElement(e[i]);
		}	
	}

	if (navigator.userAgent.match(/iPhone/i)) {
		iPhone = true;
	}

	if (navigator.userAgent.match(/Windows Phone/i)) {
		winPhone = true;
	}

	if (navigator.userAgent.match(/Android/i)) {
		if ( !/mobile/i.test(navigator.userAgent) ) { 
			androidTablet = true;
		}

		if ((/mobile/i.test(navigator.userAgent) && deviceWidth < 950)){
			androidPhone = true;
			galaxyNoteThreePortrait = true;
		}else if ((/mobile/i.test(navigator.userAgent)  && deviceWidth == 960)){
			galaxyNoteThreeLandScape = true;
		}

		if((androidTablet == true) && (deviceWidth < deviceHeight)){
			tabletPortrait = true;
		}
	}

	if (navigator.userAgent.match(/PlayBook/i)) {
		if(deviceWidth < deviceHeight){
			tabletPortrait = true;
		}
		blackberryTablet = true;
	}

	if (navigator.userAgent.match(/BB10/i)) {
		blackberryPhone = true;
	}

	
	if (navigator.userAgent.match(/iPad/i)) {
		if(deviceWidth < deviceHeight){
			tabletPortrait = true;
		}
	}

	if( iPhone == true || winPhone == true || androidPhone == true || blackberryPhone == true || tabletPortrait == true)
	{
		mobileDevice = true;
	}
	if (mobileDevice == true) {
		$scope.mobileRadio = true;
		$scope.nonMobile = false;
	}else{
		$scope.mobileRadio = false;
		$scope.nonMobile = true;
	}

	$scope.airportStatuses = [
		{name: 'DEPARTURE', selected: true},
		{name: 'ARRIVAL', selected: false}
	];

	//set default to departure
	$scope.selectedStatus = 'dep';
	

	$scope.display = false;
	$scope.newSearchButton = false;
	$scope.mobile = false;
	$scope.airports = [ 
		{name: 'Vancouver International Airport', code: 'YVR'},
		{name: 'Toronto Pearson International Airport', code: 'YYZ'},
		{name: 'Calgary International Airport', code: 'YYC'},
		{name: 'Montréal–Pierre Elliott Trudeau International Airport', code: 'YUL'},
		{name: 'Ottawa Macdonald-Cartier International Airport', code: 'YOW'},
		{name: 'Winnipeg International Airport', code: 'YWG'},
		{name: 'Halifax Stanfield International Airport', code: 'YHZ'}
	];

	$scope.airlines = [
		{code: 'EI', name: 'Aer Lingus'},
		{code: 'AC', name: 'Air Canada'},
		{code: 'CA', name: 'Air China'},
		{code: 'AF', name: 'Air France'},
		{code: 'NZ', name: 'Air New Zealand'},
		{code: '4N', name: 'Air North'},
		{code: 'FJ', name: 'Air Pacific'},
		{code: 'TS', name: 'Air Transat'},
		{code: 'AS', name: 'Alaska Airlines'},
		{code: 'NH', name: 'All Nippon Airways'},
		{code: 'AA', name: 'American Airlines'},
		{code: 'OZ', name: 'Asiana Airlines'},
		{code: 'OS', name: 'Austrian Airlines'},
		{code: 'BA', name: 'British Airways'},
		{code: '181', name: 'Canadian Air Charters'},
		{code: 'YF', name: 'Canadian Forces'},
		{code: 'C6', name: 'CanJet'},
		{code: 'W8', name: 'Cargojet Airlines'},
		{code: 'CX', name: 'Cathay Pacific Airways'},
		{code: '9M', name: 'Central Mountain Air'},
		{code: 'MG', name: 'Champion Air'},
		{code: 'CI', name: 'China Airlines'},
		{code: 'MU', name: 'China Eastern Airlines'},
		{code: 'CZ', name: 'China Southern Airlines'},
		{code: 'DE', name: 'Condor Flugdienst'},
		{code: 'DL', name: 'Delta Air Lines'},
		{code: 'ES', name: 'DHL'},
		{code: 'WK', name: 'Edelweiss Air'},
		{code: 'EG', name: 'Enerjet'},
		{code: 'BR', name: 'EVA Air'},
		{code: 'FX', name: 'Federal Express'},
		{code: 'AY', name: 'Finnair'},
		{code: 'H3', name: 'Harbour Air Ltd.'},
		{code: 'BH', name: 'Hawkair'},
		{code: 'JB', name: 'Helijet International Inc.'},
		{code: 'HH1', name: 'Highland Helicopters'},
		{code: 'QX', name: 'Horizon Air'},
		{code: 'FI', name: 'Icelandair'},
		{code: 'IX', name: 'Island Express'},
		{code: 'JL', name: 'Japan Airlines'},
		{code: 'XC', name: 'KD Air Corporation'},
		{code: 'KW', name: 'Kelowna Flightcraft'},
		{code: 'KL', name: 'KLM'},
		{code: 'KE', name: 'Korean Air'},
		{code: 'LA', name: 'LAN Airlines'},
		{code: 'LA3', name: 'London Air Service'},
		{code: 'LO', name: 'LOT Polish Airlines'},
		{code: 'LH', name: 'Lufthansa'},
		{code: 'MH', name: 'Malaysia Airlines'},
		{code: 'YX', name: 'Midwest Airlines'},
		{code: 'NTA', name: 'Northern Thunderbird Air Inc.'},
		{code: 'ORK', name: 'Orca Airways'},
		{code: '8P', name: 'Pacific Coastal Airlines Ltd'},
		{code: 'PR', name: 'Philippine Airlines'},
		{code: '19', name: 'Purolator'},
		{code: 'QF', name: 'Qantas Airways'},
		{code: '101', name: 'Saltspring Air'},
		{code: 'SK', name: 'Scandinavian Airlines SAS'},
		{code: '21', name: 'Seair Seaplanes'},
		{code: '3U', name: 'Sichuan Airlines'},
		{code: 'SQ', name: 'Singapore Airlines'},
		{code: '5G', name: 'Skyservice Airlines'},
		{code: 'OO', name: 'SkyWest Airlines'},
		{code: 'WG', name: 'Sunwing Airlines'},
		{code: 'ZZZ', name: 'Swift Air'},
		{code: 'LX', name: 'Swiss International Airlines'},
		{code: 'TG', name: 'Thai Airways'},
		{code: '25', name: 'Tofino Air'},
		{code: 'UA', name: 'United Airlines'},
		{code: '5X', name: 'United Parcel Service'},
		{code: 'US', name: 'US Airways'},
		{code: 'VS', name: 'Virgin Atlantic Airways'},
		{code: '8O', name: 'West Coast Air'},
		{code: 'WS', name: 'WestJet'}
	];


	$scope.timeframes =[
		{time:'00:00-01:00', base_time: '0'},
		{time:'01:00-02:00', base_time: '1'},
		{time:'02:00-03:00', base_time: '2'},
		{time:'03:00-04:00', base_time: '3'},
		{time:'04:00-05:00', base_time: '4'},
		{time:'05:00-06:00', base_time: '5'},
		{time:'06:00-07:00', base_time: '6'},
		{time:'07:00-08:00', base_time: '7'},
		{time:'08:00-09:00', base_time: '8'},
		{time:'09:00-10:00', base_time: '9'},
		{time:'10:00-11:00', base_time: '10'},
		{time:'11:00-12:00', base_time: '11'},
		{time:'12:00-13:00', base_time: '12'},
		{time:'13:00-14:00', base_time: '13'},
		{time:'14:00-15:00', base_time: '14'},
		{time:'15:00-16:00', base_time: '15'},
		{time:'16:00-17:00', base_time: '16'},
		{time:'17:00-18:00', base_time: '17'},
		{time:'18:00-19:00', base_time: '18'},
		{time:'19:00-20:00', base_time: '19'},
		{time:'20:00-21:00', base_time: '20'},
		{time:'21:00-22:00', base_time: '21'},
		{time:'22:00-23:00', base_time: '22'},
		{time:'23:00-00:00', base_time: '23'}
	];

	 $scope.formData = {}; 
	 var flightArray = new Array();


	 $scope.submitTheForm = function() {
	 	console.log("selected status.... = " + $scope.selectedStatus);
	 	var date = new Date();
		var currHour = date.getHours();
		var currDate = date.getDate();
		var currMonth = date.getMonth() + 1;
		var currYear = date.getFullYear();
		console.log("Current Date: " + currDate + ", Current Month: " + currMonth + ": currentYear = " + currYear + " and currHour = " + currHour);
	  	

	   console.log("--> Submitting form");
       var dataObject = {
          airport : $scope.selectedAirport
          ,airline  : $scope.selectedAirline
          ,timeframes : $scope.selectedTimeFrame
       };

       var status = angular.element(document.querySelector('.departure')).hasClass("highlight") ? "dep" : "arr";

      if (mobileDevice == true) {
      	var stats = $scope.selectedStatus;
      }else{
      	var stats = status;
      }

      console.log("Airport = " + dataObject.airport);
      console.log("Airline = " + dataObject.airline);
      console.log("Timeframe = " + dataObject.timeframes);
      console.log("Status = " + status);

      var url = "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/airport/status/"+dataObject.airport+"/"+ stats +"/"+ currYear + "/" + currMonth + "/"+ currDate +"/" + dataObject.timeframes + "?appId=8e5aec87&appKey=ed34be983e971cafe903e442f4bf630e&utc=false&numHours=1&carrier="+ dataObject.airline +"&maxFlights=10&callback=JSON_CALLBACK";
  	
	  $scope.flights = [];
	  $scope.flighttrackers = [];
	  $scope.airportList = [];
	  $scope.flightinfos = [];
	  $scope.arrivalTime = [];
	  if(status == "arr"){
	  	 $scope.columns = [ 'ARRIVAL TIME', 'ARRIVING FROM', 'FLIGHT#' ];
	  }else if (status == "dep"){
	  	 $scope.columns = [ 'DEPARTURE TIME', 'DEPARTING TO','FLIGHT#'];
	  }
	 

	   $scope.showAirportStatus = function(){
	    	console.log("STATUS = " + status);
	    	var airportStatus = ( status == "dep" ) ? "Departing" : "Arriving";
	    	return airportStatus;
	    }

	   $scope.showLocalTime = function(){
		   	var date = new Date();
			var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
			var currHour = date.getHours();
			$('#amPM').html(" " + ampm);

			
			$('#currentHour').html(currHour + ":00 " + ampm);
			$('#nextHour').html((currHour + 1) + ":00 " + ampm);


			if($scope.selectedAirport == "YVR"){
				var currTime = date.getHours() + ":" + date.getMinutes() + " " + ampm;
			}else{
				var currTime = (date.getHours()+3) + ":" + date.getMinutes() + " " + ampm;
			}
			return currTime;
	   }

	  $scope.showDate = function(){
	  		var date = new Date();
	  		return date;
	  }
		
	  
	  $http.jsonp(url).success(function(response){
	  	console.log(response);
	  	$scope.airportList = response.appendix.airports;
	    $scope.flighttrackers= response.flightStatuses;
	    flightArray = $scope.flighttrackers.slice();

	    console.log("flightArray.length = " + flightArray.length);

	    if (mobileDevice == false) {
	    	console.log("ITS NON-MOBILE SORTING !");
		    if(status == "arr"){
		    	flightArray.sort(function(a,b){
			     	var c = new Date(a.arrivalDate.dateLocal);
			     	var d = new Date(b.arrivalDate.dateLocal);
			  		return c-d;
			     });
		    }else if(status == "dep"){
		    	flightArray.sort(function(a,b){
			     	var c = new Date(a.departureDate.dateLocal);
			     	var d = new Date(b.departureDate.dateLocal);
			  		return c-d;
			     });
		    }
		}else if (mobileDevice == true) {
			console.log("ITS MOBILE SORTING !");
			$scope.getmobileTime = function(){
				return $scope.selectedStatus == "dep" ? "Departing Time:" : "Arrival Time:";
			}

			$scope.getmobileDestination = function(){	
				return $scope.selectedStatus == "dep" ? "Departing To:" : "Arriving From:";
			}

			var mobileStatus = $scope.selectedStatus;
			console.log("mobile status = " + mobileStatus);
			if(mobileStatus == "arr"){
		    	flightArray.sort(function(a,b){
			     	var c = new Date(a.arrivalDate.dateLocal);
			     	var d = new Date(b.arrivalDate.dateLocal);
			  		return c-d;
			     });
		    }else if(mobileStatus == "dep"){
		    	flightArray.sort(function(a,b){
			     	var c = new Date(a.departureDate.dateLocal);
			     	var d = new Date(b.departureDate.dateLocal);
			  		return c-d;
			     });
		    }

		}

	    try{
	    	if(flightArray.length > 0){
	    			if (angular.element(document.querySelector('.noResultMessage')).css("display") == "block"){
		    			angular.element(document.querySelector('.noResultMessage')).css("display","none");
		    		}
	    		
	    			if(angular.element(document.querySelector('.noResultContainer')).css("display") == "block"){
	    				angular.element(document.querySelector('.noResultContainer')).css("display","none");
	    			}

	    		for(var i in flightArray){
		    		var airlineSharedCodes = new Array();
		    		if(flightArray[i].hasOwnProperty('codeshares')){
		    			for( var j in flightArray[i].codeshares ) {
			    			airlineSharedCodes.push("" + flightArray[i].codeshares[j].fsCode + "" + flightArray[i].codeshares[j].flightNumber );
			    		}
			    		
			    		var airlineInfos = "" + flightArray[i].carrierFsCode + "" + flightArray[i].flightNumber + "," + airlineSharedCodes;

			    		var formattedAirlineInfos = airlineInfos.split(',').sort().join(' / ');

			    		flightArray[i]["airlineInfos"] = formattedAirlineInfos;
			    	}else{
			    		var airlineInfos = "" + flightArray[i].carrierFsCode + "" + flightArray[i].flightNumber;
			    		flightArray[i]["airlineInfos"] = airlineInfos;
			    	}
		   		}

			    for(var k in flightArray){
			    	for(var l in $scope.airportList){
			    		if (mobileDevice == false){
				    		if(status == "arr"){
				    			flightArray[k]["time"] = flightArray[k].arrivalDate.dateLocal.slice(11,16);
				    			if(flightArray[k].departureAirportFsCode == $scope.airportList[l].iata){
				    			//console.log("flightArray[k].departureAirportFsCode = " + flightArray[k].departureAirportFsCode);
				    			//console.log("$scope.airportList[k].cityCode = " + $scope.airportList[l].iata);
					    			flightArray[k].departureAirportFsCode = "" + $scope.airportList[l].city;
					    			flightArray[k]["destination"] = flightArray[k].departureAirportFsCode;
					    		}
				    		}else if (status == "dep"){
				    			flightArray[k]["time"] = flightArray[k].departureDate.dateLocal.slice(11,16);
				    			if(flightArray[k].arrivalAirportFsCode == $scope.airportList[l].iata){
					    		   flightArray[k].arrivalAirportFsCode = "" + $scope.airportList[l].city;
					    		}
					    		flightArray[k]["destination"] = flightArray[k].arrivalAirportFsCode;
					    		//console.log("flightArray[k]destination = " + flightArray[k]["destination"]);
				    		}
				    	}else if (mobileDevice == true){
				    		if(mobileStatus == "arr"){
				    			flightArray[k]["time"] = flightArray[k].arrivalDate.dateLocal.slice(11,16);
				    			if(flightArray[k].departureAirportFsCode == $scope.airportList[l].iata){
				    			//console.log("flightArray[k].departureAirportFsCode = " + flightArray[k].departureAirportFsCode);
				    			//console.log("$scope.airportList[k].cityCode = " + $scope.airportList[l].iata);
					    			flightArray[k].departureAirportFsCode = "" + $scope.airportList[l].city;
					    			flightArray[k]["destination"] = flightArray[k].departureAirportFsCode;
					    		}
				    		}else if (mobileStatus == "dep"){
				    			flightArray[k]["time"] = flightArray[k].departureDate.dateLocal.slice(11,16);
				    			if(flightArray[k].arrivalAirportFsCode == $scope.airportList[l].iata){
					    		   flightArray[k].arrivalAirportFsCode = "" + $scope.airportList[l].city;
					    		}
					    		flightArray[k]["destination"] = flightArray[k].arrivalAirportFsCode;
					    		//console.log("flightArray[k]destination = " + flightArray[k]["destination"]);
				    		}
				    	}
			    	}
			    }
	    	}else{
	    		angular.element(document.querySelector('.app')).css("margin-top","0");
	    		console.log("NO RESULT CALLED");

	    			if(angular.element(document.querySelector('.noResultMessage')).css("display") == "none"){
	    				angular.element(document.querySelector('.noResultMessage')).css("display","block");
	    			}

	    			if(angular.element(document.querySelector('.noResultContainer')).css("display") == "none"){
	    				angular.element(document.querySelector('.noResultContainer')).css("display","block");
	    			}
	    	}	
	    }catch(err){
	    	console.log("Error = " + err);
	    }
	    
	    $scope.flightinfos = flightArray.slice();
		if (mobileDevice == true) {
	    	 $scope.display = false;
	    	 angular.element(document.querySelector('#flightSearchForm')).css("display","none");
	    	 $scope.mobile = true;
	    	 angular.element(document.querySelector('.mobileResult')).css("margin-top","50px");
	    	 $scope.newSearchButton = true;
	    	 if(tabletPortrait == true){
	    	 	angular.element(document.querySelector('.app')).css("margin-top","0");
	    	 }else if(galaxyNoteThreePortrait == true){
	    	 	angular.element(document.querySelector('.app')).css("margin-top","50px");
	    	 }

	   	}else{
	   		angular.element(document.querySelector('.app')).css("margin-top","0");
	   		 $scope.display = true;
	    	 $scope.mobile = false;
	   	}

	  }).error(function(error) {
	         console.log(JSON.stringify(error));
	  });

     }

     
     $scope.showAirline = function(){
     	var airlineArray = new Array(); 
     	airlineArray = $scope.airlines.slice();
     	for(var m in airlineArray){
     		if(airlineArray[m].code == $scope.selectedAirline){
     			return airlineArray[m].name;
     		}
     	}
     }

     $scope.showAirport = function(){
     	 switch($scope.selectedAirport) {
				    case "YVR":
				        return "Vancouver International Airport"
				        break;
				    case "YYZ":
				        return "Toronto Pearson International Airport"
				        break;
				    case "YYC":
				    		return "Calgary International Airport"
				    		break;
				    case "YUL":
				    		return "Montréal–Pierre Elliott Trudeau International Airport"
				    		break;
				    case "YOW":
				    		return "Ottawa Macdonald-Cartier International Airport"
				    		break;
				    case "YWG":
				    		return "Winnipeg International Airport"
				    		break;
				    case "YHZ":
				    		return "Halifax Stanfield International Airport"
				    		break;
				    default:
				        default ""
				}
     }

     $scope.showInitialTime = function(){
     	return $scope.selectedTimeFrame >= 12 ? $scope.selectedTimeFrame + ':00PM' : $scope.selectedTimeFrame + ':00AM';;
     }

     $scope.showEndTime = function(){
     	var time_a = parseInt($scope.selectedTimeFrame);
	    var time_b;

	    if(time_a + 1 == 23){
	      	time_b = 0;
	    }else if(time_a <= 23){
	      	time_b = time_a + 1;
	    }

	    return time_b >= 12 ? time_b + ':00PM' : time_b + ':00AM'; ;
     }


});



