# hatena bookmarker
hatena bookmark chrome extention using OAuth.

## Requirement
Get your consumer key and consumer secret from hatena developer page.  
http://www.hatena.ne.jp/oauth/develop

Rewrite comsumer_key and consumer_secret in background.js   

background.js
```javascript
'consumer_key': 'YOUR CONSUMER KEY',
'consumer_secret': 'YOUR CONSUMER SECRET',
```

## Install 
chrome -> Tools -> Extensions -> check Developer mode -> Load hatena_bookmarker folder  

![install](https://raw.github.com/wiki/pppurple/hatena_bookmarker/img/import.jpg)

## Usage
Click heart icon.  
![install](https://raw.github.com/wiki/pppurple/hatena_bookmarker/img/popup.jpg)

has token  
![install](https://raw.github.com/wiki/pppurple/hatena_bookmarker/img/on.jpg)

no token  
![install](https://raw.github.com/wiki/pppurple/hatena_bookmarker/img/off.jpg)
