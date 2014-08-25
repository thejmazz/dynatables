$(document).ready(function() {
	window.innerWidth = 0;
	numCol;
	sbw = getScrollbarWidth();
	console.log(sbw);

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
	/*if (newInnerWidth > wrapperWidth - sbw){
		console.log('scrollbar conflict!');
		wrapperWidth -= sbw;
		var diff = wrapperWidth - innerWidth;
		var pad = diff / numCol;
		var intPad = parseInt(pad);

		$('#myTables td:first-child').css({'padding-left' : intPad + 'px'});
		// Could replace this following line with css
		$('#myTables table:first-child td:first-child').css({'padding-left' : '0px'});
	}*/
	var newDiff = wrapperWidth - newInnerWidth;

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

function getInnerWidth() {
	$('#myTables table').each(function(index, value) {
		innerWidth += $(value).width();
		numCol = index;
	});
}

function getScrollbarWidth() {
	// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
	var parent, child, width;

	if (width === undefined) {
		parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
		child = parent.children();
		width = child.innerWidth() - child.height(99).innerWidth();
		parent.remove();
	}

	return width;
};