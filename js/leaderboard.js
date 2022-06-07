const list_top5 = [rank1, rank2, rank3, rank4, rank5];

// retrieves the rank list and push in labels
packedRequest_GET('/rank-list', (data) => {
	const username = window.localStorage.getItem('user');
	var userRank = 0;

	data = data.split('\'').join('"');
	data = JSON.parse(data);
	for (var i = 0; i < 5; i++) {
		if (username == data[i]) userRank = (i + 1);
		if (data[i] == undefined) list_top5[i].textContent = '';
		else list_top5[i].textContent = data[i];
	}

	// gets the user's current rank
	myrank.textContent = userRank + ' |';
	myuname.textContent = window.localStorage.getItem('user');
});