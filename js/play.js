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

function proceed_newline() {
	const row = parseInt(node.current.charAt(7));
	node.prev = null;
	node.current = `txtbox_${row + 1}0`;
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

	// check if the answer is submittable
	if (guessed_answer.length == 6) {
		userGuess(guessed_answer, (response) => {
			// server-side error handling
			console.log(response);
			switch(response) {
				case '[]':
					sessionExpiredPopup();
					return;
				case '[-2]':
					maxAttemptPopup();
					return;
				case '[-3]':
					noAvailableWordsPopup();
					return;
				case '[-4]':
					wordDoesnotExist();
					del(); del(); del();
					del(); del(); del();
					return;
			}

			// check for the status of the characters answered
			response = JSON.parse(response);
			console.log(response);
			var answerIsCorrect = true;

			for (var i = 0; i < 6; i++) {
				const input_element = document.getElementById(`txtbox_${row}${i}`);

				switch(response[i]) {
					case 2:
						input_element.classList.add('right');
						break;
					case 1:
						input_element.classList.add('half');
						break;
					default:
						input_element.classList.add('wrong');
						break;
				}

				if (response[i] != 2)
					answerIsCorrect = false;
			}

			// check if the answer got correctly
			if (answerIsCorrect) {
				setTimeout(correctAnswerPopUp, 500);
				setTimeout(() => {
					resetWordleInput();
				}, 1000);
			} else {
				if (row >= 4) maxAttemptPopup();
				else proceed_newline();
			}
		});
	}
}

// retrieves the levels and game state
getSavedGameStatus(json_data => {
	json_data = JSON.parse(json_data);
	window.localStorage.setItem('point', json_data['points']);

	// loads the level that is saved
	document.getElementById('level_label').textContent = `LEVEL ${json_data['points'] + 1}`;
	console.log('State : ');
	console.log(json_data);

	// loads the state retrieved
	const state_array = json_data['state'];
	const resp_state  = json_data['resp'];

	for (var r = 0; r < state_array.length; r++) {
		for (var c = 0; c < state_array[r].length; c++) {
			const id = `txtbox_${r}${c}`;
			const element = document.getElementById(id)
			element.value = state_array[r].charAt(c);

			// gets the state of the prev word
			switch(resp_state[r][c]) {
				case 0:
					element.classList.add('wrong');
					break;
				case 1:
					element.classList.add('half');
					break;
				case 2:
					element.classList.add('right');
					break;
			}
		}
		proceed_newline();
	}
});


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