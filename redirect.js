/*
	By André Rinas, www.andreknieriem.de
	Available for use under the MIT License
*/
function Redirect(opt){
	if(typeof opt === "undefined") {
		return false;
	}
	if(!opt.url) {
		return false;
	}
	options = {
		cookieName: (opt.cookieName && opt.cookieName != '') ? opt.cookieName : 'ShouldRedirect',
		autoRedirect: (opt.autoRedirect) ? opt.autoRedirect : false,
		question: (opt.question && opt.question != '') ? opt.question : 'Want to go to the mobile page?',
		url: opt.url
	};
	
	var CookieSave = function(name, value, days){
			if (typeof days != 'undefined') {
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				var expires = "; expires=" + date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		},
		CookieGet = function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') {
						c = c.substring(1,c.length);
					}
					if (c.indexOf(nameEQ) == 0) {
						return c.substring(nameEQ.length,c.length);
					}
			}
			return false;
		},
		mredirect = function(){
			var mconfirm = confirm(options.question);
	        if(mconfirm == true){
	        	CookieSave(options.cookieName, 'always', '90');
	            window.location.href = options.url;
	        }else{
	            CookieSave(options.cookieName, 'never', '90'); 
	        }
		},
       	mobileClients = ["240x320","nintendo","blackberry","netfront","nokia","panasonic","portalmmm","sharp","sie-","sonyericsson","symbian","windows ce","benq","mda","mot-","philips","pocket pc","sagem","samsung","sda","sgh-","vodafone","xda","iphone","android","iemobile","windows phone"],
    	OperaMini = ["midp","opera mini"],
		isMobileClient = function(userAgent) {
			userAgent=userAgent.toLowerCase();
			for (var i in mobileClients) {
				if (userAgent.indexOf(mobileClients[i]) != -1) {
					return true;
				}
			}
			return false;
		},
		isOperaMini = function(userAgent) {
	        userAgent=userAgent.toLowerCase();
	        for (var i in OperaMini) {
	            if (userAgent.indexOf(OperaMini[i]) != -1) {
	                return true;
	            }
	        }
	        return false;
		};
		
		if(!CookieGet(options.cookieName)){
			if (isMobileClient(navigator.userAgent)) {
				mredirect();
			}
	        else if(isOperaMini(navigator.userAgent)){
				document.observe('dom:loaded', mredirect);
			}
		}
        if(options.autoRedirect && CookieGet(options.cookieName) == 'always'){
        	window.location.href = options.url;
        }
}