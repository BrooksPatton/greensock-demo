
$(document).on('ready', function() {


var animateIn = function() {
	return TweenLite.to($('.little-bit'), 2, {'font-size': '400px'});
};

var animateOut = function() {
	return TweenLite.to($('.little-bit'), 2, {'font-size': '100px'});
};

var tl = new TimelineLite();
tl.add(animateIn()).add(animateOut());


tl.play();




});