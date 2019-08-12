$(() => {

    let state, enPassant;

    // AJAX request to pull game data from DB
    let getGameData = () => {
        let id = $('.container').attr('id');
        $.getJSON(id).success( (data) => {
            parseState(data);
        });
    };

    // Parse the state array from GET request
    let parseState = (data) => {
        let parsedState = [];

        for (let i = 0; i < data.state.length; i++) {
            parsedState.push( data.state[i].split(' ').map( (x) => x == '0' ? null : x) );
        }
        data.state = parsedState;
        setGameData(data);
    }

    // Stringify state array to simplify PUT request
    let stringifyState = () => {
        let stringifiedState = [];

        for (let i = 0; i < state.length; i++) {
            stringifiedState.push( state[i].map( (x) => x ? x : '0' ).join(' ') );
        }

        return stringifiedState;
    }

    // Set game data once getGameData completes
    let setGameData = (game) => {
        state = game.state;
        enPassant = game.en_passant;
    }

    // Update game data once move is made
    let updateGameData = () => {
        // Build the data variable for easy insertion into DB
        let data = {
            game: {
                state: stringifyState(),
                en_passant: enPassant
            }
        }
        // Get the game ID from the DOM
        let id = $('.container').attr('id');
        $.ajax({
            url: '/games/' + id,
            type: 'PUT',    
            data: data,
            dataType: 'json',
            success: function(result) {
                alert("posted");
            }
        });
    }
    
    // Get the initial state variables from the DB
    getGameData();

    // Piece validation function
    let piece = (piece, destination) => {
        switch (piece.html().replace(/\s/g, '').charCodeAt(0)) {

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

                // If piece is a king..
            case 9812:
            case 9818:
                return validateKing(piece, destination, state);

                // If piece is a queen..
            case 9813:
            case 9819:
                return validateQueen(piece, destination, state);

            default:
                return false;
        }
    }

    // jQueryUI drag and drop function
    // Set each piece as a draggable object
    $('.piece').draggable({
        revert: "invalid"
    });

    // Set each square as a droppable area
    $('.col-1').droppable({
        
        // On drop action...  
        drop: (e, ui) => {

            // Check if the move is valid
            if (piece(ui.draggable, e.target, state)) {

                // Get rid of old en passant value
                if (enPassant.length > 0) {
                    enPassant = [];
                }

                // Set the origin and destination of the pieces
                let destX = parseInt($(e.target).attr('col'));
                let destY = parseInt($(e.target).attr('row'));
                let originX = parseInt($(ui.draggable).parent().attr('col'));
                let originY = parseInt($(ui.draggable).parent().attr('row'));

                // Remove pieces at the origin, and add/update pieces at the destination
                state[destY][destX] = `&#${ui.draggable.html().replace(/\s/g, '').charCodeAt(0)}`;
                state[originY][originX] = null;

                // Check if en passant is possible
                if (ui.draggable.html().replace(/\s/g, '').charCodeAt(0) == 9817 || ui.draggable.html().replace(/\s/g, '').charCodeAt(0) == 9823) {
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

                // Update the game state
                updateGameData();
            } else {
                // Reset the draggable
                return $(ui.draggable).draggable("option", "revert", true);
            }
        }
    });

});