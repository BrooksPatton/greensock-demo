$(function(){
	var glow = 0;
	console.log("jQuery Loaded");

	var threeDTimeline = new TimelineMax();
	var initialText;
	var types = [];

	function splitLetters(userInput){
		
		var arr = userInput.split("");
		
		for(var i=0;i<arr.length;i++) { 
			
			if(arr[i] == " "){
					arr[i] = '<div class="letter-measure blank">' + arr[i] + '</div>';
			}
			else{
	      
	      		if(!arr[i].match(/\s\n\t\r/g) && arr[i]!="") arr[i] = '<div class="letter-measure">' + arr[i] + '</div>';
	     
	     	}
	   }
	   
	   return arr.join(" ");
	}

	function explodeLetters(){
    
    threeDTimeline = new TimelineMax({align:'start'});
    
    var children = $('.splitText').children().length;
    for(var i=0;i<children;i++){
         
         for(var i=0;i<children;i++){
            
            var element = $(".splitText").children().eq(i);
            var pos = element.offset();
            element.css({'left':pos.left,'top':pos.top});
            
            threeDTimeline.insert(TweenMax.to(element, 1.4, {
            'position':'absolute', 
            left:Math.random() * 650 - 100, 
            top:Math.random() * 350 - 100, 
            fontSize:"+=35",
            ease:Expo.easeInOut,
            autoAlpha:0}));
            
        }
        // threeDTimeline.currentTime = threeDTimeline.duration;
        threeDTimeline.reversed(true);
        // threeDTimeline.reverse();
        threeDTimeline.play();
    }
}

	initialText = $(".splitText").text();
    // lets get the assosiated splits and store them
    types[0] = splitLetters(initialText);
    
        $(".splitText").empty();
        $(".splitText").html(types[0]);
        explodeLetters();

	// TweenMax.to($('.gage-header'), 1, {opacity:"1"});
	// TweenMax.to($('.gage-header2'), 1, {opacity:"1"});

	setInterval(function() {
		if (glow === 0) {
			TweenMax.to($('.gage-header'), 1, {opacity:".25"});
			glow = 1;
		}else{
			TweenMax.to($('.gage-header'), 1, {opacity:"1"});
			glow = 0;
		}
	}, 1250);
})