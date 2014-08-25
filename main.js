$(document).ready(function() {
	window.innerWidth = 0;
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
	var pad = diff/numCol;
	var intPad = parseInt(pad);
	
	$('#myTables td:first-child').css({'padding-left':intPad+'px'});
	// Could replace this following line with css
	$('#myTables table:first-child td:first-child').css({'padding-left':'0px'});

	/*var newInnerWidth = 0;
	$('#myTables table').each(function(){
		newInnerWidth += $(this).width();
	});*/
	//var newDiff = wrapperWidth - newInnerWidth;
	var newInnerWidth = innerWidth + numCol * intPad;
	var newDiff = wrapperWidth - newInnerWidth;
	
	/*var pads = Array();
	for(i=0; i < numCol; i++){
		pads.push(intPad);
	}
	console.log(pads);*/
	/*while(newDiff > 0){
		$('#myTables table.hasPad').each(function(index,value){
			if(newDiff > 0){
				//console.log($(this).find('tr td:first-child'));
				$(this).find('tr td:first-child').each(function(index,value){
					var currPad = parseInt($(value).css('padding-left').substring(0,2));
					console.log(currPad);
					$(value).css({'padding-left':currPad+1+'px'})
					console.log(currPad+1);
					console.log('altered padding');
					newDiff -= 1;
				});
				
			}
		});
	}*/
	while (newDiff > 0){
		$('#myTables table.hasPad').each(function(){
			if (newDiff > 0){
				console.log('new table');
				$(this).find('tr td:first-child').each(function(){
					var currPad = parseInt($(this).css('padding-left').slice(0, -2));
					$(this).css({'padding-left':currPad+1+'px'});
					console.log(currPad + ' -> ' + (currPad+1));
				})
				newDiff -= 1;
			}
		})
	}
	//console.log(pads);
	
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

function getInnerWidth(){
	$('#myTables table').each(function(index, value) {
		innerWidth += $(value).width();
		numCol = index;
	});
}
