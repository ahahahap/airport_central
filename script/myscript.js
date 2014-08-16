$(function() {
	var deviceHeight = $(window).height();
	var deviceWidth = $(window).width();
	console.log("deviceHeight = " + deviceHeight);
	console.log("deviceWidth = " + deviceWidth);

	
	var ie = false;
	var mobileDevice = false;
	var smallDevice = false;
	var androidDevice = false;
	var androidPhone = false;
	var androidTablet = false;
	var iPhone = false;
	var iPhonelandscape = false;
	var winPhone = false;
	var blackberryTable = false;
	var blackberryPhone = false;
	var tabletPortrait = false;
	var galaxyNoteThreeLandScape = false;
	var galaxyNoteThreePortrait = false;
	

	if (navigator.appName == 'Microsoft Internet Explorer') { 
	    ie = true;	
		var e = ("article,aside,figcaption,figure,footer,header,hgroup,nav,section,time").split(',');
		for (var i = 0; i < e.length; i++) {
			document.createElement(e[i]);
		}	
	}

	if (navigator.userAgent.match(/iPhone/i)) {
		iPhone = true;
		if(deviceWidth > deviceHeight){
			iPhonelandscape = true;
		}
	}

	if (navigator.userAgent.match(/Windows Phone/i)) {
		console.log("WINDOWS PHONE");
		winPhone = true;
	}

	if (navigator.userAgent.match(/Android/i)) {
		if ( !/mobile/i.test(navigator.userAgent) ) { 
			androidTablet = true;
			console.log("IT's ANDROID TABLET");
		}

		if ((/mobile/i.test(navigator.userAgent) && deviceWidth < 950)){
			androidPhone = true;
			galaxyNoteThreePortrait = true;
			console.log("IT's ANDROID PHONE");
		}else if ((/mobile/i.test(navigator.userAgent)  && deviceWidth == 960)){
			galaxyNoteThreeLandScape = true;
			console.log("***GALAXY NOTE 3 LANDSCAPE MODE");
		}

		if((androidTablet == true) && (deviceWidth < deviceHeight)){
			tabletPortrait = true;
		}
	}

	if (navigator.userAgent.match(/PlayBook/i)) {
		if(deviceWidth < deviceHeight){
			tabletPortrait = true;
		}
		console.log("IT'S BLACKBERRY PLAYBOOK")
		blackberryTablet = true;
	}

	if (navigator.userAgent.match(/BB10/i)) {
		console.log("IT'S BLACKBERRY PHONE");
		blackberryPhone = true;
	}

	
	if (navigator.userAgent.match(/iPad/i)) {
		if(deviceWidth < deviceHeight){
			tabletPortrait = true;
		}
	}

	if( iPhone == true || winPhone == true || androidPhone == true || blackberryPhone == true )
	{
		mobileDevice = true;
	}




	$(".navbar-brand").pageslide({ direction: "left", modal: true });

	$(".navbar-brand").click(function(){
		$('#navbarwrap').toggle();
	});
	
	$('.arrival').click(function(){
		if(!($(this).hasClass("highlight"))){
			$(this).toggleClass("highlight");
			$('.departure').toggleClass("highlight");
		}	
	})

	$('.departure').click(function(){
		if(!($(this).hasClass("highlight"))){
			$(this).toggleClass("highlight");
			$('.arrival').toggleClass("highlight");
		}
		
	});

    var marginTops = (deviceHeight / 2).toString() + "px";
    var paddingLefts = (((deviceWidth - 103) -306 )/ 2).toString() + "px";
    var maxWidth = (deviceWidth * 0.874).toString() + "px";

    $(".contactAppDiv").css("margin-top","" + marginTops );
    $(".contactAppDiv").css("padding-left","" + paddingLefts );
    $(".contactAppDiv").css("max-width","" + maxWidth);


	var isDeparture = $('#departureRadio').is(':checked');
	var isArrival = $('#arrivalRadio').is(':checked');

	if ( isDeparture == true ){
		console.log("isDeparture");
	}

	if ( isArrival == true ){
		console.log("isArrival");
	}	

	if(tabletPortrait == true){
		console.log("TABLET PORTRAIT");
		var marginTop = (deviceHeight / 3).toString() + "px";
		var appContainerWidth = (deviceWidth - 203).toString() + "px";
		//console.log("marginTop = " + marginTop);
		$('.app').css("margin-top","" + marginTop );
	}
	
	if (mobileDevice == false && tabletPortrait == false && galaxyNoteThreeLandScape == false) {
		console.log("NOT MOBILE DEVICE");
		//console.log("NOT IPHONE NOR ANDROID PHONE");
		//console.log("device's height: " + deviceHeight);
		var marginTop = (deviceHeight / 3).toString() + "px";
		var appContainerWidth = (deviceWidth - 203).toString() + "px";
		var appMaxWidth = (deviceWidth * 0.874).toString() + "px";
		$('.app').css("margin-top","" + marginTop );
		$('.app').css("max-width","" + appMaxWidth);
		$('.appContainer').css("width","" + appContainerWidth);
	}

	if( mobileDevice == true){
		console.log("AHA! ITS GALAXY NOTE 3 PORTRAIT MODE");
		var marginTop = (deviceHeight / 9).toString() + "px";
		var contactMarginTop = ((deviceHeight - 50) / 2).toString() + "px";
		var contactPaddingLeft = ((deviceWidth - 306) / 2).toString() + "px";
		$('.app').css("margin-top","" + marginTop );
		$(".contactAppDiv").css("margin-top","" + contactMarginTop );
		$(".contactAppDiv").css("padding-left","" + contactPaddingLeft );
	}

	if( galaxyNoteThreeLandScape == true){
		console.log("AHA! ITS GALAXY NOTE 3 LANDSCAPE MODE");
		var appContainerWidth = (deviceWidth - 203).toString() + "px";
		$('.appContainer').css("width","" + appContainerWidth);
		$('.appContainer').css("margin-left","0");
		$('#status').css("height","50px");
		var paddingLeft = (deviceWidth / 4).toString() + "px";
    	var marginTops = (deviceHeight / 2).toString() + "px";
        console.log("marginTops = " + marginTops);
        console.log("paddingLefts = " + paddingLefts);
        $(".contactAppDiv").css("margin-top","" + marginTops );
        $(".contactAppDiv").css("padding-left","" + paddingLeft );
	}
	
	if( galaxyNoteThreePortrait == true){
		console.log("AHA! ITS GALAXY NOTE 3 PORTRAIT MODE");
		var marginTop = (deviceHeight / 4).toString() + "px";
		$('.app').css("margin-top","" + marginTop );
	}

	if(iPhone == true && iPhonelandscape == true){
		console.log("IPHONE LANDSCAPE!");
		$('footer').css("position","inherit");
		$('#pageslide').css("overflow-x","auto");
		var paddingLeft = (deviceWidth / 4).toString() + "px";
    	var marginTops = (deviceHeight / 2).toString() + "px";
        console.log("marginTops = " + marginTops);
        console.log("paddingLefts = " + paddingLefts);
        $(".contactAppDiv").css("margin-top","" + marginTops );
        $(".contactAppDiv").css("padding-left","" + paddingLeft );
   
	}

	/*var string = "Hello,World";
	var a = string.replace(/,/g, ' / ');
	console.log("a = " + a);

	var airline = "AC151,LO4137,NZ4785,LH6638,AV6904";
	var array = new Array(airline);
	console.log("sorted string= " + airline.split(',').sort().join(','));

	var aria = new Array(1,5,2,6,3,9);
    aria.sort(function(a,b){
    	console.log("a = " + a);
    	console.log("b = " + b);
    	return a - b;
    });

     console.log("aria = " + aria);*/

	//var a = $("[name='test']").val();
    //console.log("a = " + a);
});