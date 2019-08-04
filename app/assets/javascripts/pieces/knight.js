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
    
    let moveArray = [];
    moveArray.push([originX - 1, originY - 2]);
    moveArray.push([originX + 1, originY - 2]);
    moveArray.push([originX + 2, originY - 1]);
    moveArray.push([originX + 2, originY + 1]);

    for (let i = 0; i < 4; i++) {
        moveArray.push(moveArray[i].reverse());
    }

    let movePossible = () => {
        for (let i = 0; i < moveArray.length; i++) {
            if (moveArray[i] = [destY, destX]) {
                return true;
            }            
        }
        return false;
    }
    
    //if the square is empty, capturable, not blocked & the piece moved diagonally
    if ((empty || capturable()) && movePossible()) {
        return true;
    }

    return false;
}