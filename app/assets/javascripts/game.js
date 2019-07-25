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

	// jQueryUI drag and drop function
	$('.col-1').droppable({
		drop: (e, ui) => {
			if (validatePawn(ui.draggable, e.target)) {
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
