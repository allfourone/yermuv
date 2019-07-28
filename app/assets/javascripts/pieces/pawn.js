let validatePawn = (piece, destination, state, enPassant) => {

    // Returns true if the squares are occupied by same color
    // Else, it returns an array with the piece colors (or empty) 
    let squareOccupiedBySameColor = (piece, destination) => {
        let pieceColor = piece.html().charCodeAt(0) < 9818 ? "white" : "black";
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

    // Set positive direction for white, negative direction for black
    let direction = pieceColor === "white" ? 1 : -1;

    // Allow en passant
    if (enPassant.length > 0) {
        if (direction > 0 && Math.abs(originX - enPassant[0]) == 1 && destX == enPassant[0] && destY + 1 == enPassant[1]) {
            $('.col-1[row=' + enPassant[1] + '][col=' + enPassant[0] + ']').empty();
            return true;
        } else if (direction < 0 && Math.abs(originX - enPassant[0]) == 1 && destX == enPassant[0] && destY - 1 == enPassant[1]) {
            return true;
        }
    }

    // Only allow diagonal movement if a piece is capturable
    if (originX !== destX && !capturable()) {
        return false;
    }

    // Check if piece has moved yet, and allow either 1 or 2 squares
    // Works for both black and white pawns
    if (direction > 0) {
        if (originY == 6 && ((destY == 5 && !state[5][originX]) || (destY == 4 && !state[5][originX] && !state[4][originX])) ) {
            return true;
        } else if (originY == 6 && destY < 4) {
            return false;
        }
    } else if (direction < 0) {
        if (originY == 1 && ((destY == 2 && !state[2][originX]) || (destY == 3 && !state[2][originX] && !state[3][originX])) ) {
            return true;
        } else if (originY == 1 && destY > 3) {
            return false;
        }
    }

    // Check if pawn moving forward based on direction 
    if (originY - (1 * direction) !== destY) {
        return false;
    }

    // If square is empty, move forward in straight line
    // If square is not empty, stop movement
    // If moving diagonally, check if the distance between rows is 1
    // If it is, and the piece is of the opposite color, allow movement
    if ((empty && !capturable()) || (!empty && (Math.pow((originX - destX), 2) == 1 && capturable()))) {
        return true;
    }

    return false;
}