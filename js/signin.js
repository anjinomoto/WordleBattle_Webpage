tokenRequestMulti();
setTimeout(handshake, 500);

function login() {
	const username = document.getElementById('txt');
	const password = document.getElementById('pw');

	loginCreds(username.value, password.value, undefined, (response) => {
		if (response == 'successful') {
			window.location.replace('intro.html');
		} else {
			document.getElementById('acc_status').hidden = false;
		}
	});
}

const login_button = document.getElementById('button');
login_button.onclick = login;