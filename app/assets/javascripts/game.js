$(() => {

	// This needs to be an AJAX request to pull from the DB and not hard-coded!
	var state = [
			['&#9823;','&#9822;','&#9821;','&#9819;','&#9818;','&#9821;','&#9822;','&#9823;'],
			['&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;'],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			[null,null,null,null,null,null,null,null],
			['&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;'],
			['&#9814;','&#9816;','&#9815;','&#9813;','&#9812;','&#9815;','&#9816;','&#9814;']	
	];

	$('.piece').draggable({ 
		revert: "invalid"
	});

	let squareOccupiedBySameColor = (piece, destination) => {
		let pieceColor = piece.html().charCodeAt(0) < 9818 ? "white" : "black";
		let destinationPiece = destination.innerHTML.charCodeAt(0);
		let destinationColor = destinationPiece == 10 ? "empty" : destinationPiece < 9818 ? "white" : "black";
		
		return pieceColor === destinationColor;
	}

	let validatePawn = (piece, destination) => {
		let originX = parseInt($(piece).parent().attr('col'));
		let originY = parseInt($(piece).parent().attr('row'));
		let destX = parseInt($(destination).attr('col'));
		let destY = parseInt($(destination).attr('row'));

		if (originX !== destX) {
			return false;
		}

		if (originY == 6 && (destY == 5 || destY == 4)) {
			return true;		
		} else if (destY > 4) {
			return false;
		}

		if (originY - 1 == destY) {
			return true;
		}
		
		return false;
	}

	$('.col-1').droppable({
		drop: (e, ui) => {
			if (validatePawn(ui.draggable, e.target) && !squareOccupiedBySameColor(ui.draggable, e.target)) {
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
