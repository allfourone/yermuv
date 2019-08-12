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
	
}