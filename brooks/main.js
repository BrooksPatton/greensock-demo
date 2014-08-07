var BROOKS_LOCATION = '#brooks';
var MIN_TOP = 0;
var MAX_BOTTOM = 500;
var BOX_CREATION_RATE = 1000;
var ANIMATE_TIME = 1;
var FINAL_DESTINATION = '500px';

var boxes = [];
var intervalIndexes = [];

var Box = function() {

}
Box.prototype.create = function() {
	this.el = $('<div>');
	this.el.addClass('box');
};
Box.prototype.render = function(instance, location) {
	this.el.css(location);
	$(BROOKS_LOCATION).append(this.el);
	this.animate();
};
Box.prototype.animate = function() {
	TweenLite.to(this.el, ANIMATE_TIME, {left: FINAL_DESTINATION, ease: Bounce.easeOut});
};

var createBox = function() {
	var box = new Box();
	var el = box.create();
	boxes.push(box);
	return box;
};

var renderBox = function(box, location) {
	box.render(box, location);
};

var getRandomLocation = function() {
	return {top: _.random(MIN_TOP, MAX_BOTTOM)};
};

var startAnimating = function(box) {
	intervalIndexes.push(setInterval(function() {
		
	}))
}

$(document).on('ready', function() {
	setInterval(function() {
		renderBox(createBox(), getRandomLocation());
	}, BOX_CREATION_RATE);
});