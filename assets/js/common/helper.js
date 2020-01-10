const $getId = id => {
  return document.getElementById(id);
};

// Create cookie
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Read cookie
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
function checkAuth() {
  var user = window.localStorage.getItem("weld_user");
  var token = readCookie("weld_token");
  if (token == null) {
    var auth =
      '<li><a href="javascript:void(0)" id="signup">Signup</a></li>\n' +
      '<li><a href="javascript:void(0)" id="login">Login</a></li>';
  } else {
    var auth = '<li><a href="javascript:void(0)" id="logout">Logout</a></li>';
  }
  return auth;
}
