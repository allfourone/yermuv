let validateRook = (piece, destination) => {
	// Returns true if the squares are occupied by same color
	// Else, it returns an array with the piece colors (or empty) 
	let squareOccupiedBySameColor = (piece, destination) => {
		let pieceColor = piece.html().charCodeAt(0) < 9818 ? "white" : "black";
		let destinationPiece = destination.innerText ? destination.innerText.charCodeAt(0) : false;
		let destinationColor = !destinationPiece ? "empty" : destinationPiece < 9818 ? "white" : "black";
		
		return pieceColor === destinationColor ? false : [pieceColor, destinationColor];
	}
	
	return true;
}