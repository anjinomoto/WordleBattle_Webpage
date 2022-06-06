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

// function for poping up the correct answer
function correctAnswerPopUp() {
	document.getElementById('popup').hidden = false;
	document.getElementById('message').innerText = 'You got the correct answer!';
}

// function for warning that there are no words available
function noAvailableWordsPopup() {
	document.getElementById('popup').hidden = false;
	document.getElementById('message').innerText = 'No words are available to solve :(';
}

function PopOut() {
	document.getElementById('popup').hidden = true;
	window.location.replace('play.html');
}

