$(function() {
	var deviceHeight = $(window).height();
	var deviceWidth = $(window).width();
	var ie = false;
	var mobileDevice = false;
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

	if(tabletPortrait == true){
		var marginTop = (deviceHeight / 3).toString() + "px";
		var appContainerWidth = (deviceWidth - 203).toString() + "px";
		$('.app').css("margin-top","" + marginTop );
	}
	
	if (mobileDevice == false && tabletPortrait == false && galaxyNoteThreeLandScape == false) {
		var marginTop = (deviceHeight / 3).toString() + "px";
		var appContainerWidth = (deviceWidth - 203).toString() + "px";
		var appMaxWidth = (deviceWidth * 0.874).toString() + "px";
		$('.app').css("margin-top","" + marginTop );
		$('.app').css("max-width","" + appMaxWidth);
		$('.appContainer').css("width","" + appContainerWidth);
	}

	if( mobileDevice == true){
		var marginTop = (deviceHeight / 9).toString() + "px";
		var contactMarginTop = ((deviceHeight - 50) / 2).toString() + "px";
		var contactPaddingLeft = ((deviceWidth - 306) / 2).toString() + "px";
		$('.app').css("margin-top","" + marginTop );
		$(".contactAppDiv").css("margin-top","" + contactMarginTop );
		$(".contactAppDiv").css("padding-left","" + contactPaddingLeft );
	}

	if( galaxyNoteThreeLandScape == true){
		var appContainerWidth = (deviceWidth - 203).toString() + "px";
		$('.appContainer').css("width","" + appContainerWidth);
		$('.appContainer').css("margin-left","0");
		$('#status').css("height","50px");
		var paddingLeft = (deviceWidth / 4).toString() + "px";
    	var marginTops = (deviceHeight / 2).toString() + "px";
        $(".contactAppDiv").css("margin-top","" + marginTops );
        $(".contactAppDiv").css("padding-left","" + paddingLeft );
	}
	
	if( galaxyNoteThreePortrait == true){
		var marginTop = (deviceHeight / 4).toString() + "px";
		$('.app').css("margin-top","" + marginTop );
	}

	if(iPhone == true && iPhonelandscape == true){
		$('footer').css("position","inherit");
		$('#pageslide').css("overflow-x","auto");
		var paddingLeft = (deviceWidth / 4).toString() + "px";
    	var marginTops = (deviceHeight / 2).toString() + "px";
        $(".contactAppDiv").css("margin-top","" + marginTops );
        $(".contactAppDiv").css("padding-left","" + paddingLeft );
   
	}
});