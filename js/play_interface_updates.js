// function for updating level
function incrementLevel() {
	const score = parseInt(window.localStorage.getItem('score'));
	level_label.textContent = `LEVEL ${score + 1}`;
}

// function for reseting all the values
function resetWordleInput() {
	for (var row = 0; row < 5; row++) {
		for (var col = 0; col < 6; col++) {
			const element = document.getElementById(`txtbox_${row}${col}`)
			element.value = '';
			element.classList.remove('right');
			element.classList.remove('wrong');
			element.classList.remove('half');
		}
	}
}