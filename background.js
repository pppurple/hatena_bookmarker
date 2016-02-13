var oauth = ChromeExOAuth.initBackgroundPage({
	'request_url': 'https://www.hatena.com/oauth/initiate',
	'authorize_url': 'https://www.hatena.ne.jp/oauth/authorize',
	'access_url': 'https://www.hatena.com/oauth/token',
	'consumer_key': 'YOUR CONSUMER KEY',
	'consumer_secret': 'YOUR CONSUMER SECRET',
	'scope': 'write_public,read_public',
	'app_name': 'hatena bookmarker'
});

function setIcon() {
	if (oauth.hasToken()) {
		chrome.browserAction.setIcon({ 'path' : 'img/hatebu_icon_on.png'});
	} else {
		chrome.browserAction.setIcon({ 'path' : 'img/hatebu_icon_off.png'});
	}
};

var bookmarkRes = {};

function showResult(text, xhr) {

	bookmarkRes.status = xhr.status;
	bookmarkRes.statusText = xhr.statusText;

	chrome.tabs.create({
		url: chrome.extension.getURL('dialog.html'),
		active: false
	}, function(tab) {
		chrome.windows.create({
			tabId: tab.id,
			type: 'popup',
			top: 20,
			height: 150,
			width: 400,
			focused: true
		});
	});
};

function sendPost () {
	var bookmarkInfo = JSON.parse(oauth.getBookmarkInfo());
	oauth.authorize(function() {
		setIcon();
		var restUrl = "http://api.b.hatena.ne.jp/1/my/bookmark";
		var request = {
			'method': 'POST',
			'parameters': {
				// はてなAPI側でURLを正規化してくれるため、そのまま送信
				'url': bookmarkInfo.bookmarkUrl,
				'comment' : bookmarkInfo.comment,
				'private' : bookmarkInfo.secret
			}
		};
		oauth.sendSignedRequest(restUrl, showResult, request);
	});
};

chrome.extension.onRequest.addListener(function(req, sender) {
	switch(req.action) {
		case 'getAccessToken':
			var reqToken = oauth.getReqToken();
			var bookmarkInfo = JSON.parse(oauth.getBookmarkInfo());
			oauth.getAccessToken(reqToken, encodeURIComponent(req.verifier), sendPost);
			break;
		case 'bookmark':
			oauth.setBookmarkInfo(JSON.stringify(req));
			sendPost(); 
			break;
		case 'closeTab':
			chrome.tabs.remove(sender.tab.id, function() {});
	}
});

function logout() {
	oauth.clearTokens();
	setIcon();
};

setIcon();
