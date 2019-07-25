$(() => {

	// This needs to be an AJAX request to pull from the DB and not hard-coded!
	let state = [
			['&#9820;','&#9822;','&#9821;','&#9819;','&#9818;','&#9821;','&#9822;','&#9820;'],
			['&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;'],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			['&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;'],
			['&#9814;','&#9816;','&#9815;','&#9813;','&#9812;','&#9815;','&#9816;','&#9814;']	
	];

	let piece = (piece, destination) => {
		switch (piece.html().charCodeAt(0)) {
			
			// If piece is a pawn...
			case 9817:
			case 9823:
				return validatePawn(piece, destination);
			
			case 9820:
			case 9814:
				return validateRook(piece, destination);

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
			if (piece(ui.draggable, e.target)) {
				e.target.innerHTML = `<p class="piece">${ui.draggable.html()}</p>`;
				ui.draggable.remove();
				$('.piece').draggable({
					revert: "invalid"
				});				
			}	else {
				return $(ui.draggable).draggable("option", "revert", true);
			}		
		}
	});

});
