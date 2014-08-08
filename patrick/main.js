

$(document).on('ready', function() {

	var lilBit = $('.little-bit')

	var animateIn = function() {
		return TweenMax.to(lilBit, 0.75, {css:{'font-size': '400px', 'opacity': 1}, ease: SlowMo.easeIn});
	};

	var animateOut = function() {
		return TweenMax.to(lilBit, 1, {css:{'font-size': '60px', 'opacity': 0.35}, ease: Elastic.ease});
	};

	var tl = new TimelineMax({paused: true});
	tl.add(animateIn()).add(animateOut());
	tl.play();

	var hilight = function() {
		return TweenMax.to(lilBit, 0.5, {css:{'font-size': '90px', 'opacity': 1}, ease:Elastic.ease});
	};
	
	var tl2 = new TimelineMax({paused: true});
	tl2.add(hilight());
	
	
	$(document).on('click', ".icon-play", function() {
		tl.restart();
	});

	$(document).on('mouseover', ".little-bit", function() {
		tl2.restart()
	});



// _____________________________________________________________________________
	var $liveSnap = $("#liveSnap");
	var $container = $("#container");
	var gridRows = 7;
	var gridColumns = 8;
	var columnWidth = $container.width()/gridColumns;
	// console.log('width: ' + columnWidth);
	// console.log(columnWidth % 1);
	var rowHeight = $container.height()/gridRows;
	// console.log('height: ' + rowHeight);

	$('.box').css({'height': rowHeight + 'px',
					'width': columnWidth + 'px',
					'line-height': rowHeight + 'px'});
	$('#box2').css({'left': ((parseInt(gridColumns*0.65)) * columnWidth)});

	for (var i = 0; i < gridRows; i++) {
		var y = i * rowHeight;
		$container.prepend($("<div class='grid-row'/>").css({'height':rowHeight, 'top':y}));
	}

	for (var i = 0; i < gridColumns; i++) {
		var x = i * columnWidth;
		$container.prepend($("<div class='grid-column'/>").css({'width':columnWidth, 'left':x}));
	}





	// set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
	TweenLite.set($container, {height: gridRows * rowHeight + 1, width: gridColumns * columnWidth + 1});
	TweenLite.set(".box", {width:columnWidth, height:rowHeight, lineHeight:rowHeight + "px"});

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
					return (liveSnap) ? Math.round(endValue / columnWidth) * columnWidth : endValue;
				},
				y: function(endValue) {
					return (liveSnap) ? Math.round(endValue / rowHeight) * rowHeight : endValue;
				}
			}
		});
	}

	var applySnap = function() {
		if ($liveSnap.prop("checked")) {
			$(".box").each(function(index, element) {
				TweenLite.to(element, 0.5, {
					x:Math.round(element._gsTransform.x / columnWidth) * columnWidth,
					y:Math.round(element._gsTransform.y / rowHeight) * rowHeight,
					delay:0.1,
					ease:Power2.easeInOut
				});
			});
		}
		update();
	};

	update();




// ________________________________________________________________________

$('.box').onDrag(console.log('hey'));



});