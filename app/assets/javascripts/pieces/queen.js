let validateQueen = (piece, destination, state) => {
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

    return (validateRook(piece, destination, state) || validateBishop(piece, destination, state));
}