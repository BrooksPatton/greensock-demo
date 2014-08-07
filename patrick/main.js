
$(document).on('ready', function() {


	var animateIn = function() {
		return TweenLite.to($('.little-bit'), 2, {'font-size': '400px'});
	};

	var animateOut = function() {
		return TweenLite.to($('.little-bit'), 2, {'font-size': '80px'});
	};

	var tl = new TimelineLite();
	tl.add(animateIn()).add(animateOut());


	tl.play();

// _____________________________________________________________________________
	var $liveSnap = $("#liveSnap");
	var $container = $("#container");
	var gridWidth = 100;
	var gridHeight = 65;
	var gridRows = 6;
	var gridColumns = 5;
	var i;
	var x;
	var y;

	//loop through and create the grid (a div for each cell). Feel free to tweak the variables above
	for (i = 0; i < gridRows * gridColumns; i++) {
		y = Math.floor(i / gridColumns) * gridHeight;
		x = (i * gridWidth) % (gridColumns * gridWidth);
		$("<div/>").css({position:"absolute", border:"1px solid #454545", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
	}

	//set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
	TweenLite.set($container, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
	TweenLite.set(".box", {width:gridWidth, height:gridHeight, lineHeight:gridHeight + "px"});

	//the update() function is what creates the Draggable according to the options selected (snapping).
	function update() {
		var liveSnap = $liveSnap.prop("checked");
		Draggable.create(".box", {
			bounds:$container,
			edgeResistance:0.65,
			type:"x,y",
			throwProps:true,
			liveSnap:liveSnap,
			snap:{
				x: function(endValue) {
					return (liveSnap) ? Math.round(endValue / gridWidth) * gridWidth : endValue;
				},
				y: function(endValue) {
					return (liveSnap) ? Math.round(endValue / gridHeight) * gridHeight : endValue;
				}
			}
		});
	}

	var applySnap = function() {
		if ($liveSnap.prop("checked")) {
			$(".box").each(function(index, element) {
				TweenLite.to(element, 0.5, {
					x:Math.round(element._gsTransform.x / gridWidth) * gridWidth,
					y:Math.round(element._gsTransform.y / gridHeight) * gridHeight,
					delay:0.1,
					ease:Power2.easeInOut
				});
			});
		}
		update();
	};

	update();






});