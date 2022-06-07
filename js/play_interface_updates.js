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

	document.getElementById('button_proceed').innerText = '>';
}

// function for warning that there are no words available
function noAvailableWordsPopup() {
	document.getElementById('popup').hidden = false;
	document.getElementById('message').innerHTML = 'You have reached the max level<br/>Comming soon...';

	const button_element = document.getElementById('button_proceed');
	button_element.innerText = 'ok';
	button_element.onclick = () => {
		PopOut();
		window.location.replace('first_interface.html');
	}
}

// function for alerting the max attempt
function maxAttemptPopup() {
	document.getElementById('popup').hidden = false;
	document.getElementById('message').innerText = 'Max guessing attempt!';

	const button_element = document.getElementById('button_proceed');
	button_element.innerHTML = '&#8634;';
	button_element.onclick = () => {
		retryWord(); 
		PopOut();
		resetWordleInput()
	}
}

// if session has expired for the account
function sessionExpiredPopup() {
	document.getElementById('popup').hidden = false;
	document.getElementById('message').innerText = 'Session Expired';

	const button_element = document.getElementById('button_proceed');
	button_element.innerText = '!';
	button_element.onclick = () => {
		PopOut();
		logoutCreds();
		window.location.replace('.');
	}
}

// if the entered word does not exist in the dictionary
function wordDoesnotExist() {
	document.getElementById('popup').hidden = false;
	document.getElementById('message').innerText = 'Word does not exist in the dictionary!';

	const button_element = document.getElementById('button_proceed');
	button_element.innerText = 'ok';
	button_element.onclick = () => {
		PopOut();
	}
}

function PopOut() {
	document.getElementById('popup').hidden = true;
	window.location.replace('play.html');
}

function popUpSettings() {
	document.getElementById('settingsPopup').hidden = false;
}

// other application
var audio = new Audio("./sound/tap.wav");

settings.onclick = () => {
	audio.play();
	popUpSettings();
}

exit.onclick = () => {
	audio.play();
	window.location.replace('first_interface.html');
}