$(() => {

    // This needs to be an AJAX request to pull from the DB and not hard-coded!
    var state = [
        ['&#9823;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9823;'],
        ['&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;'],
        ['&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;']
    ];

    $('.piece').draggable({
        revert: "invalid"
    });

    // Returns true if the squares are occupied by same color
    // Else, it returns an array with the piece colors (or empty) 
    let squareOccupiedBySameColor = (piece, destination) => {
        let pieceColor = piece.html().charCodeAt(0) < 9818 ? "white" : "black";
        let destinationPiece = destination.innerText ? destination.innerText.charCodeAt(0) : false;
        let destinationColor = !destinationPiece ? "empty" : destinationPiece < 9818 ? "white" : "black";

        return pieceColor === destinationColor ? false : [pieceColor, destinationColor];
    }

    let validatePawn = (piece, destination) => {
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

        // Only allow diagonal movement if a piece is capturable
        if (originX !== destX && !capturable()) {
            return false;
        }

        // Check if piece has moved yet, and allow either 1 or 2 squares
        // Works for both black and white pawns
        if (direction > 0) {
            if (originY == 6 && (destY == 5 || destY == 4)) {
                return true;
            } else if (originY == 6 && destY < 4) {
                return false;
            }
        } else if (direction < 0) {
            if (originY == 1 && (destY == 2 || destY == 3)) {
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

    // jQueryUI drag and drop function
    $('.col-1').droppable({
        drop: (e, ui) => {
            if (validatePawn(ui.draggable, e.target)) {
                e.target.innerHTML = `<p class="piece">${ui.draggable.html()}</p>`;
                ui.draggable.remove();
                $('.piece').draggable({
                    revert: "invalid"
                });
            } else {
                return $(ui.draggable).draggable("option", "revert", true);
            }
        }
    });

});