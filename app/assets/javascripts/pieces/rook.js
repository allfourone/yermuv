let validateRook = (piece, destination, state) => {
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

    // Check if moving in a straight line
    if (originX !== destX && originY !== destY) {
        return false;
    }


    // Check if path is blocked
    let blocked = () => {
        // Get the direction the rook is moving
        let xDirection = originX - destX > 0 ? 1 : -1;
        let yDirection = originY - destY > 0 ? 1 : -1;

        // First check if moving in the Y direction
        if (originX === destX) {
            // Check for every square, not counting origin or destination
            // since we check destination with empty & capturable()
            let i = originY - (1 * yDirection);
            while (i !== destY) {
                // check the state at the coordinates for a piece
                if (state[i][originX]) {

                    return true;
                }
                // Increment the counter based on the direction of travel
                i -= 1 * yDirection;
            }
            // Check if moving in the X direction
        } else if (originY === destY) {
            // Check for every square, not counting origin or destination
            // since we check destination with empty & capturable()
            let i = originX - (1 * xDirection);
            while (i !== destX) {
                // check the state at the coordinates for a piece
                if (state[originY][i]) {

                    return true;
                }
                // Increment the counter based on the direction of travel
                i -= 1 * xDirection;
            }
        }
        return false;
    }

    if ((empty || capturable()) && !blocked()) {
        return true;
    }

    return false;
}