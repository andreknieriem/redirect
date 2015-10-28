# redirect.js
Simple redirect script for mobile devices

### Usage
Simple include redirect.js to your page
```javascript
new Redirect({
	url: 'http://andreknieriem.de'
});
```

###Options
| Property | Required | Default | Type | Description |
| -------- | -------- | ------- | ---- | ----------- |
| url | yes | none | string | the url to the mobile page |
| cookieName | no | 'ShouldRedirect' | string | name of the cookie used |
| autoRedirect | no | false | bool | should the script redirect everytime if clicked on yes |
| question | no | 'Want to go to the mobile page?' | string | the string from the confirm prompt |