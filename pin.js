window.onload = function() {
	var pin = document.querySelector(".verifier");

	if ((pin !== undefined && pin !== null)) {
		chrome.extension.sendRequest({ 
			"action" : "getAccessToken",
			"verifier": pin.innerText.replace(/\r?\n/g,"")
		});
		chrome.extension.sendRequest({
			"action" : "closeTab"
		});
	}
};
