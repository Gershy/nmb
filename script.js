$(function() {
	var textContent = $('#text-content');
	var streamLayer = $('.layer.text-stream-set');
	
	var recalcStreamWidth = function() {
		var expandWidth = streamLayer.width();
		var streamSet = streamLayer.children('.text-stream');
		
		var numChanged = 0;
		
		streamSet.each(function() {
			var children = $(this).children('.item');
			var firstChild = children.eq(0);
			var childW = firstChild.outerWidth();
			var numChildrenRequired = Math.ceil(expandWidth / childW) + 1;
			
			if (children.length !== numChildrenRequired) {
				$(this).children('.item:not(:first-child)').remove();
				for (var i = 0; i < numChildrenRequired - 1; i++) $(this).append(firstChild.clone());
				numChanged++;
			}
		});
	};
	$(window).on('resize', recalcStreamWidth);
	
	var updateStreamDelaySecs = 0.2;
	var updateStreams = function() {
		var streams = streamLayer.children('.text-stream');
		streams.each(function() {
			var item = $(this).children('.item').eq(0);
			
			var spd = (($(this).data('spd') * updateStreamDelaySecs) + 1) * 0.8;
			var left = parseInt($(this).data('left'));
			
			var newLeft = left - spd;
			
			var reset = newLeft <= -item.outerWidth();
			
			if (!reset) {
				$(this).data('left', newLeft);
				$(this).css('left', newLeft.toString() + 'px');
			} else {
				
				// Need to avoid the animation
				$(this).detach();
				$(this).data('left', 0);
				$(this).css('left', '0px');
				streamLayer.append($(this));
				
			}
			
		});
	};
	setInterval(updateStreams, updateStreamDelaySecs * 1000);
	
	var streams = textContent.children('.text-stream-set').children('.text-stream');
	
	var streamValues = [];
	
	var positioning = [
		{ size: 95, top: 55 },
		{ size: 88, top: 43 },
		{ size: 23, top: 6 },
		{ size: 67, top: 90 },
		{ size: 18, top: 71 },
		{ size: 73, top: 36 },
		{ size: 55, top: 29 },
		{ size: 50, top: 99 },
		{ size: 110, top: 13 },
		{ size: 107, top: 12 },
		{ size: 41, top: 88 },
		{ size: 88, top: 84 },
		{ size: 85, top: 21 },
		{ size: 23, top: 69 },
		{ size: 96, top: 2 },
		{ size: 29, top: 23 },
	];
	
	streams.each(function(i) {
		var elem = $('<div class="text-stream"></div>');
		var innerElem = $('<div class="item"></div>');
		innerElem.text($(this).text());
		
		var maxSize = 120;
		var minSize = 14;
		var sizeRange = maxSize - minSize;
		//var size = minSize + Math.ceil(Math.random() * sizeRange);
		//var top = Math.floor(Math.random() * 100);
		var size = positioning[i].size;
		var top = positioning[i].top;
		
		elem.css({
			fontSize: size,
			height: size.toString() + 'px', lineHeight: size.toString() + 'px', marginTop: (-(size >> 1)).toString() + 'px',
			opacity: (((maxSize - size) / maxSize) * 0.91) + 0.09,
			zIndex: maxSize - size,
			top: top.toString() + '%',
		});
		console.log(elem.css('opacity'));
		
		elem.data('spd', Math.pow(((maxSize - size) + 1.5) * 0.4, 1.06) * 0.5);
		
		elem.append(innerElem);
		streamLayer.append(elem);
		
		elem.data('left', -innerElem.outerWidth());
		
		streamValues.push({
			size: size,
			top: top,
		});
	});
	
	console.log(streamValues);
	
	streamLayer.removeClass('faded');
	
	recalcStreamWidth();
});