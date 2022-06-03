// handles the current input pointer
node = {
	current : 'txtbox_00',
	prev : null
}

// will be triggered when a character is inputted
function press(character) {
	const row = parseInt(node.current.charAt(7));
	const col = parseInt(node.current.charAt(8));

	// check if the column is still valid
	if (col <= 5) {
		const input_element = document.getElementById(node.current);
		input_element.value = character;

		// update the node values
		node.prev = node.current;
		node.current = `txtbox_${row}${col + 1}`;
	}
}

// if delete key is pressed
function del() {
	if (node.prev != null) {
		node.current = node.prev;
		document.getElementById(node.prev).value = '';

		// check if decremented value is valid
		const row = parseInt(node.current.charAt(7));
		const col = parseInt(node.current.charAt(8));
		if (col > 0) node.prev = `txtbox_${row}${col - 1}`;
		else node.prev = null;
	}
}

// will be triggered if the enter is pressed
function submit_answer() {
	// retrieve all the current row values
	const row = parseInt(node.current.charAt(7));
	var guessed_answer = '';

	for (var col = 0; col < 6; col++) {
		const input_element = document.getElementById(`txtbox_${row}${col}`);
		guessed_answer += input_element.value;
	}

	console.log(guessed_answer);
	node.prev = null;
	node.current = `txtbox_${row + 1}0`;
}

// event handler for handling text input
window.addEventListener('keydown', (evt) => {

	// check if the key belongs to alphabet characters
	if ('a' <= evt.key && evt.key <= 'z') {
		const upperKey = evt.key.toUpperCase();
		press(upperKey);
	}

	if (evt.key === 'Backspace')
		del();

	if (evt.key === 'Enter')
		submit_answer();
});