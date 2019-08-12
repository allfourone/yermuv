 $(() => {

     let state, enPassant;

     // AJAX request to pull game data from DB
     let getGameData = async () => {
         let id = $('.container').attr('id');
         $.getJSON(id).success((data) => {
             parseState(data);
         });
     };

     // Parse the state array from GET request
     let parseState = (data) => {
         let parsedState = [];

         for (let i = 0; i < data.state.length; i++) {
             parsedState.push(data.state[i].split(' ').map((x) => x == '0' ? null : x));
         }
         data.state = parsedState;
         setGameData(data);
     }

     // Stringify state array to simplify PUT request
     let stringifyState = () => {
         let stringifiedState = [];

         for (let i = 0; i < state.length; i++) {
             stringifiedState.push(state[i].map((x) => x ? x : '0').join(' '));
         }

         return stringifiedState;
     }

     // Set game data once getGameData completes
     let setGameData = (game) => {
         state = game.state;
         enPassant = game.en_passant;
         whitePiecesCaptured = game.white_piece_captured;
         blackPiecesCaptured = game.black_piece_captured;
     }

     // Update game data once move is made
     let updateGameData = () => {
         let data = {
             game: {
                 state: stringifyState(),
                 en_passant: enPassant,
                 white_piece_captured: whitePiecesCaptured,
                 black_piece_captured: blackPiecesCaptured
             }
         }
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

     getGameData();

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
                 return $(ui.draggable).draggable("option", "revert", true);
             }
         }
     });

 });