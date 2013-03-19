<!doctype html>
<head> <meta charset = "utf-8" /> </head>

<body>
<div id="fb-root"></div>

<div id="login" style="visibility: hidden">
  <button onclick="login()">Login with Facebook</button>
</div>

<div id="main" style="visibility: hidden">
  You're logged in to Facebook and you have notauthorized this app.
</div>
</body>

</html>

<script>
  window.app = {};

  function login() 
  {
    FB.login(function(response) 
      {
	if (response.authResponse) 
	{
	  app.uid = response.authResponse.userID;
	  buildMain();
	  Login();
	} 
	else 
	{
	  notLogin();
	}
      });
  }

  function buildMain() 
  {
    var img = document.createElement('img');
    img.src = 'http://graph.facebook.com/' + app.uid + '/picture?type=large';
    document.getElementById('main').appendChild(img);
  }
  
  function Login() 
  { 
    document.getElementById('main').style.visibility = 'visible';
    document.getElementById('login').style.visibility = 'hidden';
  }
  
  function notLogin() 
  { 
    document.getElementById('main').style.visibility = 'hidden';
    document.getElementById('login').style.visibility = 'visible';
  }




  window.fbAsyncInit = function() 
  {
    FB.init({
      appId      : '343160149122415', 
      channelUrl : '//http://localhost:5000/', 
      status     : true,  // check login status
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true   // parse XFBML
      });
    FB.getLoginStatus(function(response) 
	{
	  if (response.status === 'connected') 
	  {
	    app.uid = response.authResponse.userID;
	    buildMain();
	    Login();
	    
	  } 
	  
	  else if (response.status === 'not_authorized') 
	  {
	    notLogin();
	  } 
	  else 
	  {
	    notLogin();
	  }
	});
  };

  (function(d)
  {
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>