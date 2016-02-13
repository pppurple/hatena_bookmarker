window.onload = function() {
	var output = document.querySelector('#output');
	var header = document.querySelector('header');
	var button = document.querySelector('button');

	var div = document.createElement('div');
	var message = document.createElement('h4');
	var errorMessage = document.createElement('p');

	var background = chrome.extension.getBackgroundPage();
	if (background.bookmarkRes.status == 200) {
		header.classList.add("bg-blue");
		button.classList.add("bg-light-blue");
		message.innerText = "ブックマークしました!";
	} else {
		header.classList.add("bg-red");
		button.classList.add("bg-blue-grey");
		message.innerText = "ブックマークに失敗しました・・・";
		errorMessage.innerText = background.bookmarkRes.status + " : " + background.bookmarkRes.statusText;
	};
	div.appendChild(message);
	div.appendChild(errorMessage);
	output.appendChild(div);
};

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button').addEventListener('click', function () {
		window.close();
	});
});

