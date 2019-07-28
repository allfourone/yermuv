
$(() => {

    // This needs to be an AJAX request to pull from the DB and not hard-coded!
    let state = [
        ['&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'],
        ['&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;'],
        ['&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;']
    ];

    let enPassant = [];

    let piece = (piece, destination) => {
        switch (piece.html().charCodeAt(0)) {

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


                // Implement cases for more pieces
                // ASCII char code is the HTML minus the &# symbol

            default:
                return false;
        }
    }

    $('.piece').draggable({
        revert: "invalid"
    });

    // jQueryUI drag and drop function
    $('.col-1').droppable({
        drop: (e, ui) => {
            if (piece(ui.draggable, e.target, state)) {

                // Update the state

                // Get rid of old en passant value
                if (enPassant.length > 0) {
                  enPassant = [];
                }

                let destX = parseInt($(e.target).attr('col'));
                let destY = parseInt($(e.target).attr('row'));
                let originX = parseInt($(ui.draggable).parent().attr('col'));
                let originY = parseInt($(ui.draggable).parent().attr('row'));
                state[destY][destX] = `&#${ui.draggable.html().charCodeAt(0)}`;
                state[originY][originX] = null;

                // Check if en passant is possible
                if (ui.draggable.html().charCodeAt(0) == 9817 || ui.draggable.html().charCodeAt(0) == 9823) {
                  if (Math.abs(destY - originY) > 1) {
                    enPassant = [destX, destY];
                  }
                }

                // Update the DOM 
                e.target.innerHTML = `<p class="piece">${ui.draggable.html()}</p>`;
                // Delete the piece
                ui.draggable.remove();
                // Make all the pieces draggable again
                $('.piece').draggable({
                    revert: "invalid"
                });
            } else {
                return $(ui.draggable).draggable("option", "revert", true);
            }
        }
    });

});
