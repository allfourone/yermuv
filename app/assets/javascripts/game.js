$(() => {

	// This needs to be an AJAX request to pull from the DB and not hard-coded!
	var state = [
		['br','bn','bb','bq','bk','bb','bn','br'],
		['bp','bp','bp','bp','bp','bp','bp','bp'],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null],
		['wp','wp','wp','wp','wp','wp','wp','wp'],
		['wr','wn','wb','wq','wk','wb','wn','wr']	
	];

	$('.piece').draggable({ 
		revert: "invalid"
	});

	$('.col-1').droppable({
		drop: (e, ui) => {
			validatePawn(ui.draggable, state);
			e.target.innerHTML = `<p class="piece">${ui.draggable.html()}</p>`;
			ui.draggable.remove();
			$('.piece').draggable({
				revert: "invalid"
			});
		}
	});

	let validatePawn = (piece) => {
		// Implement me!
	}

});
