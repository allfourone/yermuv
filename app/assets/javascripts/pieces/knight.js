let validateKnight = (piece, destination, state) => {
    // Returns true if the squares are occupied by same color
    // Else, it returns an array with the piece colors (or empty) 
    let squareOccupiedBySameColor = (piece, destination) => {
        let pieceColor = piece.html().replace(/\s/g, '').charCodeAt(0) < 9818 ? "white" : "black";
        let destinationPiece = destination.innerText ? destination.innerText.charCodeAt(0) : false;
        let destinationColor = !destinationPiece ? "empty" : destinationPiece < 9818 ? "white" : "black";

        return pieceColor === destinationColor ? false : [pieceColor, destinationColor];
    }

    // Begin by checking if the square is occupied by same color
    if (!squareOccupiedBySameColor(piece, destination)) {
        return false;
    }

    // Get the colors of pieces occupying the squares
    let colors = squareOccupiedBySameColor(piece, destination)
    let pieceColor = colors[0];
    let destinationColor = colors[1];

    // Is only capturable if the destination is not empty and the colors are different
    let capturable = () => {
        if (destinationColor !== 'empty' && pieceColor !== destinationColor) {
            return true;
        }

        return false;
    }

    // Calc if the destination is empty
    let empty = destinationColor === 'empty';

    // Calculate origin & destination coords given the HTML nodes
    let originX = parseInt($(piece).parent().attr('col'));
    let originY = parseInt($(piece).parent().attr('row'));
    let destX = parseInt($(destination).attr('col'));
    let destY = parseInt($(destination).attr('row'));

    // Make sure it is not moving in a straight line in either direction
    if (destX === originX || destY === originY) {

        return false;
    }

    // Create an array of possible moves for knights given origin coords
    // 8 possible moves for each knight, but 4 of them are inverses
    // of the other. Only need to generate 4 unique moves then reverse them.
    let moveArray = [];
    moveArray.push([originX - 1, originY - 2]);
    moveArray.push([originX + 1, originY - 2]);
    moveArray.push([originX + 2, originY - 1]);
    moveArray.push([originX + 2, originY + 1]);
    moveArray.push([originX + 1, originY + 2]);
    moveArray.push([originX - 1, originY + 2]);
    moveArray.push([originX - 2, originY - 1]);
    moveArray.push([originX - 2, originY + 1]);
    // For each move, generate the inverse and add it to the array of moves
    for (let i = 0; i < 8; i++) {
    moveArray.push(moveArray[i].reverse());
}
    console.log(moveArray);

    // Check if the move is possible by iterating over the array
    // Check if valid X and Y coords match the destination coords, or return false
    let movePossible = () => {
        for (let i = 0; i < moveArray.length; i++) {
            if (moveArray[i][0] == destY && moveArray[i][1] == destX) {

                return true;
            }
        }
        return false;
    }

    //if the square is empty, capturable, & made a valid knight move
    if ((empty || capturable()) && movePossible()) {
        return true;
    }

    return false;
}