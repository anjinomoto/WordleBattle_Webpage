tokenRequestMulti();
handshake();

function login() {
	const username = document.getElementById('txt');
	const password = document.getElementById('pw');

	loginCreds(username.value, password.value, undefined, (response) => {
		if (response == 'successful') {
			console.log('SUCCESSS LOGIN!');
		} else {
			document.getElementById('acc_status').hidden = false;
		}
	});
}

const login_button = document.getElementById('button');
login_button.onclick = login;