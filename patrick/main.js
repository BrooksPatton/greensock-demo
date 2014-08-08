

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
	var $container = $("#pc-container");
	var gridRows = 7;
	var gridColumns = 8;
	var columnWidth = $container.width()/gridColumns;
	// console.log('width: ' + columnWidth);
	// console.log(columnWidth % 1);
	var rowHeight = $container.height()/gridRows;
	// console.log('height: ' + rowHeight);

	$('.pc-box, .pc-early-box').css({'height': rowHeight + 'px',
					'width': columnWidth + 'px',
					'line-height': rowHeight + 'px'});
	$('#pc-box2').css({'left': ((parseInt(gridColumns*0.65)) * columnWidth)});

	for (var i = 0; i < gridRows; i++) {
		var y = i * rowHeight;
		$container.prepend($("<div class='pc-grid-row'/>").css({'height':rowHeight, 'top':y}));
	}

	for (var i = 0; i < gridColumns; i++) {
		var x = i * columnWidth;
		$container.prepend($("<div class='pc-grid-column'/>").css({'width':columnWidth, 'left':x}));
	}





	// set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
	TweenLite.set($container, {height: gridRows * rowHeight + 1, width: gridColumns * columnWidth + 1});
	TweenLite.set(".pc-box", {width:columnWidth, height:rowHeight, lineHeight:rowHeight + "px"});

	//the update() function is what creates the Draggable according to the options selected (snapping).
	function update() {
		var liveSnap = $liveSnap.prop("checked");
		Draggable.create(".pc-box", {
			bounds:$container,
			edgeResistance:0.65,
			type:"x,y",
			liveSnap:liveSnap,
			snap:{
				x: function(endValue) {
					return Math.round(endValue / columnWidth) * columnWidth;
				},
				y: function(endValue) {
					return Math.round(endValue / rowHeight) * rowHeight;
				}
			},
			onDrag: function() {
				var thisTop = Math.floor($(this.target).offset().top)
				var thisLeft = Math.floor($(this.target).offset().left)

				// console.log('top: ' + thisTop + '   left: ' + thisLeft);
				

				var gridColumn = $('.pc-grid-column');
				var gridRow = $('.pc-grid-row');

				var currentColumn = "";
				var currentRow = "";

				for (var i = 0; i < gridColumn.length; i++) {
					if(thisLeft > ((gridColumn.eq(i).offset().left) - 5) && thisLeft < ((gridColumn.eq(i).offset().left) + 5)) {
						// console.log('this column index: ' + i );
						currentColumn = i;
					}
					gridColumn.css('border', '');
				}
				gridColumn.eq(currentColumn).css('border-left', '1px dotted gray');

				
				for (var i = 0; i < gridRow.length; i++) {
					if(thisTop > ((gridRow.eq(i).offset().top) - 5) && thisTop < ((gridRow.eq(i).offset().top) + 5)) {
						// console.log('this row index: ' + i);
						currentRow = i;
					}
					gridRow.css('border', '');
				}
				gridRow.eq(currentRow).css('border-top', '1px dotted gray');
			},
			onDragEnd: function() {
				$('.pc-grid-row, .pc-grid-column').css('border', '');
			}
		});
		
	}

	var applySnap = function() {
		if ($liveSnap.prop("checked")) {
			$(".pc-box").each(function(index, element) {
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


		

	$(document).on('mousedown', '.pc-early-box', function() {
		var thisPlaceLeft = event.pageX;
		var thisPlaceTop = event.pageY;

		console.log(thisPlaceTop + " " + thisPlaceLeft);

		$('.pc-early-box').removeClass('pc-early-box').addClass('pc-box pc-drag-box');



		update();
	});

	$(document).on('click', '.pc-early-box', function() {
		var boxReplace = $('.pc-box-menu').html();
		$('.pc-box-menu').append(boxReplace);
	});



// ________________________________________________________________________

});