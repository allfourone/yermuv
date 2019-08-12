let validateQueen = (piece, destination, state) => {
    return (validateRook(piece, destination, state) || validateBishop(piece, destination, state));
}