var sm = angular.module('socialModule', []);

//sm.config(function ($httpProvider) {
   // $httpProvider.defaults.useXDomain = true;
   // delete $httpProvider.defaults.headers.common['X-Requested-With'];
//})

//SocialRequestController.$inject = ["$scope", "$http"];
sm.controller("SocialRequestController", SocialRequestController);


function SocialRequestController($scope) {
    _this = this;
    this.$scope = $scope;
    $scope.languageName =["Angular JS","HTML","CSS","Java Script"];
   
    }

    /*function getInstagramUserInfo(accessToken) {
        var url = "https://api.instagram.com/v1/users/self/?access_token=" + accessToken + "&callback=JSON_CALLBACK";
        $http.jsonp(url).then(function (response) {
            _this.instagramUserInfo = response.data.data;
        })

    }

    function authenticateInstagram(instagramClientId, instagramRedirectUri, callback) {
        //the pop-up window size, change if you want
        var popupWidth = 800,
                popupHeight = 500,
                popupLeft = (window.screen.width - popupWidth) / 2,
                popupTop = (window.screen.height - popupHeight) / 2;

        var popupUrl= 'https://instagram.com/oauth/authorize/?client_id=' + instagramClientId + '&redirect_uri=' + instagramRedirectUri + '&response_type=token'

        var popup = window.open(popupUrl, '', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + popupLeft + ',top=' + popupTop + '');
        popup.onload = function () {
            //an interval runs to get the access token from the pop-up
            var interval = setInterval(function () {
                try {
                    //check if hash exists
                    if (popup.location.hash.length) {
                        //hash found, that includes the access token
                        clearInterval(interval);
                        var accessToken = popup.location.hash.slice(14); //slice #access_token= from string
                        popup.close();
                        if (callback != undefined && typeof callback == 'function') callback(accessToken);
                    }
                }
                catch (evt) {
                    //permission denied
                    console.log("error");
                }
            }, 100);
        }
    };

    $scope.twitterAuthenticate = function () {
        generateSignatureKey();
       var _authHeader = ['OAuth oauth_consumer_key="' + $scope.requiredParameters.oauth_consumer_key + '"',
            'oauth_nonce="' + $scope.requiredParameters.oauth_nonce + '"',
            'oauth_signature_method="HMAC-SHA1"',
            'oauth_timestamp="' + $scope.requiredParameters.oauth_timestamp + '"',
            'oauth_signature="' + $scope.signatureKey + '"',
            'oauth_version="1.0"'].join(',');

        $http({
            method: 'POST',
            url: 'https://api.twitter.com/oauth/request_token',
            headers: {
                'Authorization': _authHeader,
            }

        }).then(function (response) {
           var responseObj = getUrlQueryObject(response.data);
           authenticateTwitter(responseObj.auth_token);
        });

    }

    function generateSignatureKey() {
        var nonceObj = new jsSHA(Math.round((new Date()).getTime() / 1000.0), "TEXT");
        $scope.oauth_consumer_secret = "vlv4rGektIJYW8cPnzVCSDAY18lgJrbqtoeuGLDA0kFbZhRUOF";
        $scope.endpoint = "https://api.twitter.com/oauth/request_token";
        $scope.requiredParameters = {};
        $scope.requiredParameters['oauth_consumer_key'] = "7e7u2AdYFdyJlwBBRKUWtaG0z";
        $scope.requiredParameters['oauth_nonce'] = nonceObj.getHash("SHA-1", "HEX");
        $scope.requiredParameters['oauth_signature_method'] = "HMAC-SHA1";
        $scope.requiredParameters['oauth_timestamp'] =  parseInt(new Date().getTime()/1000, 10);
        $scope.requiredParameters['oauth_version'] = "1.0";
        $scope.base_signature_string = "POST&" + encodeURIComponent($scope.endpoint) + "&";

        var requiredParameterKeys = Object.keys($scope.requiredParameters);
        for (var i = 0; i < requiredParameterKeys.length; i++) {
            if (i == requiredParameterKeys.length - 1) {
                $scope.base_signature_string += encodeURIComponent(requiredParameterKeys[i] + "=" + $scope.requiredParameters[requiredParameterKeys[i]]);
            } else {
                $scope.base_signature_string += encodeURIComponent(requiredParameterKeys[i] + "=" + $scope.requiredParameters[requiredParameterKeys[i]] + "&");
            }
        }
        if (typeof $scope.base_signature_string !== "undefined" && $scope.base_signature_string.length > 0) {
            if (typeof $scope.oauth_consumer_secret !== "undefined" && $scope.oauth_consumer_secret.length > 0) {
                var shaObj = new jsSHA($scope.base_signature_string, "TEXT");
                $scope.signatureKey = encodeURIComponent(shaObj.getHMAC($scope.oauth_consumer_secret + "&", "TEXT", "SHA-1", "B64"));
            }
        }
    }

    function authenticateTwitter(oauth_token) {
        //the pop-up window size, change if you want
        var popupWidth = 800,
                popupHeight = 500,
                popupLeft = (window.screen.width - popupWidth) / 2,
                popupTop = (window.screen.height - popupHeight) / 2;
    var popupUrl= 'https://api.twitter.com/oauth/authenticate?oauth_token='+oauth_token
        var popup = window.open(popupUrl, '', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + popupLeft + ',top=' + popupTop + '');
        popup.onload = function () {
            //an interval runs to get the access token from the pop-up
            var interval = setInterval(function () {
                try {
                    var str = popup.location.search;
                    if (str.search('oauth_verifier')>=0) {
                        clearInterval(interval);
                        var urlObj = getUrlQueryObject(popup.location.search);
                        console.log(urlObj);
                        getTwitterUserInfo(urlObj);
                        popup.close();
                    }
                }
                catch (evt) {
                    //permission denied
                    console.log("error");
                }
            }, 100);
        }
    };

    function getTwitterUserInfo(urlObj) {
         var params = {
          oauth_token:urlObj.oauth_token,
          oauth_verifier:urlObj.oauth_verifier,
        }
        $http({
            method:'POST',
            url:'https://api.twitter.com/oauth/access_token',
            params :params,
        }).then(function (response) {
            var userInfo =getUrlQueryObject(response.data);
            console.log(userInfo);
        },function (error) {
           console.log(error);
        })
    }

    function getUrlQueryObject(query_string) {
		var vars = {}, hash;
		if (!query_string) {
			return false;
		}
		var hashes = query_string.slice(1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

  //using oauth.io
  $scope.twitterSignIn = function () {
      OAuth.initialize('Fyz29IKDeOZMK-nsuzSf4DlksWM');
      var provider = 'twitter'
      OAuth.popup(provider)
              .done(function (result) {
                  result.get('/me')
                          .done(function (response) {
                              console.log(response.name);
                          })
                          .fail(function (err) {
                              console.log(err);
                              //handle error with err
                          });
              })
              .fail(function (err) {
                   console.log(err);
                  //handle error with err
              });
  }


// Twitter Login using Firebase
    $scope.twitterLogin = function () {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
       var authorizationProcess = oauth1Client.authorize();
    }
}

SocialRequestController.prototype.pinInvite = function () {
     PDK.login({ scope : 'read_relationships,read_public' }, function(response){
            if (!response || response.error) {
              //  alert('Error occurred');
            } else {
               console.log(JSON.stringify(response));
            }
        //get board info
        var pins = [];
        PDK.request('/v1/me/', function (response) {
          if (!response || response.error) {
            //alert('Error occurred');
          } else {
            console.log(JSON.stringify(response));
              //  alert('success');
                console.log(PDK.getSession().accessToken);

               /* var yahoo = $( "#result" ).load( "https://api.pinterest.com/v1/me/?access_token="+PDK.getSession().accessToken+"&fields=counts" );
                console.log(yahoo);
                PDK.logout();*/
          //}
        //});

        //end get board info
       // });
        //end login
//}
