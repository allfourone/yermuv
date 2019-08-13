// Copy of validateMove() function to work in check.js
let validateMove = (piece, destination, state, enPassant) => {
	switch (piece.html().replace(/\s/g, '').charCodeAt(0)) {

			// If piece is a pawn...
			case 9817:
			case 9823:
					return validatePawn(piece, destination, state, enPassant);

			// If piece is a rook...
			case 9820:
			case 9814:
					return validateRook(piece, destination, state);

			//if piece is a knight...
			case 9816:
			case 9822:
					return validateKnight(piece, destination, state);

			// If piece is a bishop..
			case 9815:
			case 9821:
					return validateBishop(piece, destination, state);

			// If piece is a king..
			case 9812:
			case 9818:
					return validateKing(piece, destination, state);

			// If piece is a queen..
			case 9813:
			case 9819:
					return validateQueen(piece, destination, state);

			default:
					return false;
	}
}

// Function to test for check
let isInCheck = (color, state, enPassant) => {

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
	let destination = $('.col-1[row=' + kingPosition[0] + '][col=' + kingPosition[1] + ']')[0]
	
	// Iterate over each piece, and check for a valid move to the king
	$('.piece').each(function(i) {
		if ($(this).html().replace(/\s/g, '').charCodeAt(0) != 9812 && $(this).html().replace(/\s/g, '').charCodeAt(0) != 9818) {
			
			// check if the piece can make a move to the king
			if ( validateMove($(this), destination, state, enPassant) ) {
				
				// check if the piece is of an opposite color
				// if so, the king is in check!
				pieceColor = $(this).html().replace(/\s/g, '').charCodeAt(0) < 9818 ? "white" : "black";
				if ( pieceColor !== color ) {
					console.log("check by ", $(this).html().replace(/\s/g, ''), 'charCode =', $(this).html().replace(/\s/g, '').charCodeAt(0), 'pieceColor =',pieceColor, 'color =', color)
					return true;
				}				
			}
		}		
	});

	return false;
}