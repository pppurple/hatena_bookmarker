var tabUrl;

window.onload = function() {
	chrome.tabs.getSelected(null, function (tab) {
		tabUrl = tab.url;
		console.debug("tabUrl: " + tabUrl);
	});
};

function bookmark() {
	var secret = 0;
	var comment = document.getElementById("comment").value;
	if (document.getElementById("secret").checked) {
		secret = 1;
	}
	chrome.extension.sendRequest({
		"action" : "bookmark",
		"bookmarkUrl" : tabUrl,
		"comment" : comment,
		"secret" : secret
	});
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button').addEventListener('click', bookmark);
});
