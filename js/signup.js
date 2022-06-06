// to confirm if proper handshake was made (for encryption and session purposes)
tokenRequestMulti();
setTimeout(handshake, 500);

// retrieve username and password
// try to login the credentials
function signup() {
	const username = document.getElementById('txt');
	const password = document.getElementById('pw');
	const cpassword = document.getElementById('cpw');

	if (password.value === cpassword.value) {
		// registers the username and password
		registerCreds(username.value, password.value, undefined, (data) => {
			if (data === 'successful') {
				loginCreds(username.value, password.value, undefined, (response) => {
					if (response === 'successful')
						window.location.replace('intro.html');
				});
			} else {
				document.getElementById('acc_status').hidden = false;
				alert('Account is already registered or the username already exists!')
			}
		});
	}
}

// if this button is clicked execute the signup function
const sign_up_button = document.getElementById('button');
sign_up_button.onclick = signup;