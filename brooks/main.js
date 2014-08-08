var BROOKS_LOCATION = '#brooks';
var MIN_TOP = 30;
var MAX_BOTTOM = 480;
var BOX_CREATION_RATE = 3000;
var ANIMATE_TIME = 2;
var FINAL_DESTINATION = '100%';
var ANIMATE_DELAY_MAX = 1;
var ANIMATION_START_RATE = 100;
var LEFT_START = -20;

var boxes = [];
var intervalIndexes = [];
var id = 0;

var Box = function(id) {
	this.id = id;
}
Box.prototype.create = function() {
	this.el = $('<div>');
	this.el.addClass('box');
	this.setRandomColor();
};
Box.prototype.render = function(instance, location) {
	this.el.css(location);
	$(BROOKS_LOCATION).append(this.el);
	this.animate();
};
Box.prototype.animate = function() {
	TweenLite.to(this.el, ANIMATE_TIME, {
		left: FINAL_DESTINATION, 
		ease: Bounce.easeOut, 
		delay: _.random(0, ANIMATE_DELAY_MAX), 
		onComplete: deleteBox,
		onCompleteParams: [this.id]
	});
};
Box.prototype.removeFromDom = function() {
	this.el.remove();
};
Box.prototype.setRandomColor = function() {
	this.el.css('background', '#' + (Math.random().toString(16) + '000000').slice(2, 8));
};

var createBox = function() {
	var box = new Box( id++ );
	var el = box.create();
	boxes.push(box);
	return box;
};

var renderBox = function(box, location) {
	box.render(box, location);
	updateBoxCount();
};

var getRandomLocation = function() {
	return {
		top: _.random(MIN_TOP, MAX_BOTTOM),
		left: LEFT_START
	};
};

var startAnimating = function(box) {
	intervalIndexes.push(setInterval(function() {
		renderBox(createBox(), getRandomLocation());
	}, BOX_CREATION_RATE))
}

var deleteBox = function(id) {
	var box = _.findWhere(boxes, {id: id})
	box.removeFromDom();
	boxes.splice(_.indexOf(boxes, box), 1);
}

var updateBoxCount = function() {
	$('#brooks-num-boxes').text(boxes.length);
};

var runEngine = function() {
	intervalIndexes.push(setInterval(function() {
		startAnimating();
	}, ANIMATION_START_RATE));
};

var stopEngine = function() {
	intervalIndexes.forEach(function(interval) {
		clearInterval(interval);
	});
}

$(document).on('ready', function() {
	$('#brooks-start').on('click', runEngine);
	$('#brooks-stop').on('click', stopEngine);
});