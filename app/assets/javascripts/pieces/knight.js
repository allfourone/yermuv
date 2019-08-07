let validateKnight = (piece, destination, state) => {
    //Check to see if it is Player 1 or Player 2's turn.
    //Player 1 (white) goes first and a counter keeps track of each move
    let player = piece.html().replace(/\s/g, '').charCodeAt(0) < 9818 ? "player_one" : "player_two";
    if (player === "player_one") {
        if (counter % 2 === 0) {
            counter += 1;
            return true
        } else {
            return false
        }
    }

    if (player === "player_two") {
        if (counter % 2 === 1) {
            counter += 1;
            return true
        } else {
            return false
        }
    }

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

    // Check if the move is possible by checking if moving in an L shape
    let movePossible = () => {
        let xDif = Math.abs(destX - originX);
        let yDif = Math.abs(destY - originY);

        if ((xDif == 2 && yDif == 1) || (xDif == 1 && yDif == 2)) {
            return true;
        }

        return false;
    }

    //if the square is empty, capturable, & made a valid knight move
    if ((empty || capturable()) && movePossible()) {
        return true;
    }

    return false;
}