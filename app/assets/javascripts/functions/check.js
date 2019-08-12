let isInCheck = (color, state) => {

	let kingPosition;

	// Iterate through state array to find the king
	for (let y = 0; y < state.length; y++) {
		for (let x = 0; x < state[y].length; x++) {

			if (color == 'white' && state[y][x] == '&#9812;') {
				kingPosition = [y, x];
			} else if (color == 'black' && state[y][x] == '&#9818;') {
				kingPosition = [y, x];
			}

		}
	}
	
	// Locate the king in the DOM
	let destination = $('.col-1[row=' + kingPosition[1] + '][col=' + kingPosition[0] + ']')
	
	// Iterate over each piece, and check for a valid move to the king
	$('.piece').each(function(i) {
		if ($(this).html().replace(/\s/g, '').charCodeAt(0) != 9812 || $(this).html().replace(/\s/g, '').charCodeAt(0) != 9818) {
			if ( piece($(this), destination, state) ) {
				console.log("check!")
				return true;
			}
		}		
	});

	return false;
}