
$(document).on('ready', function() {

var myTween = TweenLite.to('#photo2', 10, {css: {scaleZ:0.5, rotation:-720}, ease:Bounce.easeOut, paused: true});

	$('.start').on('click', function () {
		myTween.resume();

	})

	

	$('.grow').on('click', function () {
		var tweener =TweenLite.to('#photo', 3, {width: '90%', onComplete: myFunction});
		function myFunction(){

		tweener.restart();


	}
	})

	// made an item disapear
	// TweenLite.to('#beer', 2, {autoAlpha:0});

	var tl = new TimelineLite();

		tl.from('h2',  1.5, {left: 100, autoAlpha: 0})
		.from('h3',  1.5, {left: 100, autoAlpha: 0},'h3')
		.from('#beer',  0.5, {left: 100, autoAlpha: 0},'h3+=0.25')
		.staggerFrom('.container2', 0.1, {scale: 10, autoAlpha:0},'h3');

		$('.container2').on('mouseover', function() {
			// $(this).remove();
			var deliver = Draggable.create(".container2", {type:"x,y", edgeResistance:0.05, bounds:".container", throwProps:true});
			console.log('clicked');
		})

		$('.container2').mouseup(function () {
			TweenLite.to("h3", 4, {boxShadow: "0px 0px 50px red", color: "#FC0"});
			TweenLite.to('h2', 2, {boxShadow: '0px 0px 40px blue', color: 'blue'})

		})

});