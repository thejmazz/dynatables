$(document).ready(function() {
	// Fire window resize event when scrollbar added or removed
	hackyScrollbarResizeListener();
	
	genTables(5,20);
	
	
	innerWidth = 0;
	numCol;

	getInnerWidth();
	main();

	$(window).resize(function() {
		main();
	});
});

function main() {
	var wrapperWidth = $('#myTables').width();
	var diff = wrapperWidth - innerWidth;
	var pad = diff / numCol;
	var intPad = parseInt(pad);

	$('#myTables td:first-child').css({'padding-left' : intPad + 'px'});
	// Could replace this following line with css
	$('#myTables table:first-child td:first-child').css({'padding-left' : '0px'});
	
	var newInnerWidth = innerWidth + numCol * intPad;
	var newDiff = wrapperWidth - newInnerWidth;
	updateConsole();
	
	while (newDiff > 0) {
		$('#myTables table.hasPad').each(function() {
			if (newDiff > 0) {
				console.log('new table');
				$(this).find('tr td:first-child').each(function() {
					var currPad = parseInt($(this).css('padding-left').slice(0, -2));
					$(this).css({'padding-left' : currPad + 1 + 'px'});
					console.log(currPad + ' -> ' + (currPad + 1));
				});
				newDiff -= 1;
			}
		})
	}

	updateConsole();

	function updateConsole() {
		$('#wrapperWidth').html(wrapperWidth);
		$('#innerWidth').html(innerWidth);
		$('#diff').html(diff);
		$('#numCol').html(numCol);
		$('#intPad').html(intPad);
		$('#pad').html(pad);
		$('#newInnerWidth').html(newInnerWidth);
		$('#newDiff').html(newDiff);
	}
}

function genTables(rows, numItems){
	var s = '<table><tbody>';
	for (var i=0; i < numItems; i++){
		s += '<tr><td class="des">Description</td><td class="con">content</td></tr>';
		if ((i+1) % rows == 0 && (i+1) != numItems){
			s += '</tbody></table><table class="hasPad"><tbody>';
		}
	}
	s += '</tbody></table><div class="clear"></div>';
	
	$('#myTables').html(s);
	console.log('Generated table with ' + numItems + ' items and ' + rows + ' rows.');
}

function getInnerWidth() {
	$('#myTables table').each(function(index, value) {
		innerWidth += $(value).width();
		numCol = index;
	});
}

function hackyScrollbarResizeListener(){
	// https://gist.github.com/OrganicPanda/8222636
	 
	// Create an invisible iframe
	var iframe = document.createElement('iframe');
	iframe.id = "hacky-scrollbar-resize-listener";
	iframe.style.cssText = 'height: 0; background-color: transparent; margin: 0; padding: 0; overflow: hidden; border-width: 0; position: absolute; width: 100%;';
	 
	// Register our event when the iframe loads
	iframe.onload = function() {
	  // The trick here is that because this iframe has 100% width 
	  // it should fire a window resize event when anything causes it to 
	  // resize (even scrollbars on the outer document)
	  iframe.contentWindow.addEventListener('resize', function() {
	    try {
	      var evt = document.createEvent('UIEvents');
	      evt.initUIEvent('resize', true, false, window, 0);
	      window.dispatchEvent(evt);
	    } catch(e) {}
	  });
	};
	 
	// Stick the iframe somewhere out of the way
	document.body.appendChild(iframe);
}