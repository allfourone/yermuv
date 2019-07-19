$(() => {

	$('.piece').draggable({ 
		revert: "invalid"
	});

	$('.col-1').droppable({
		drop: (e, ui) => {
			e.target.innerHTML = `<p class="piece">${ui.draggable.html()}</p>`;
			ui.draggable.remove();
			$('.piece').draggable({
				revert: "invalid"
			});
		}
	});

});
