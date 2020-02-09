const loginForm = document.querySelector(".login-form");
const forgetForm = document.querySelector(".forget-form");
const signupForm = document.querySelector(".signup-form");

//This is Duplication, bad practice
if (mode === "login") {
  loginForm.style.display = "block";
  forgetForm.style.display = "none";
  signupForm.style.display = "none";
}

if (mode === "passwordforgot") {
  loginForm.style.display = "none";
  forgetForm.style.display = "block";
  signupForm.style.display = "none";
}

//This is Duplication, bad practice
if (mode === "signup") {
  loginForm.style.display = "none";
  forgetForm.style.display = "none";
  signupForm.style.display = "block";
}

/*const fog = $getId("users_login_form");
if (fog) {
  fog.addEventListener("click", function(elem) {
    var login = document.querySelector(".login-form");
    login.style.display = "block";
    var forget = document.querySelector(".forget-form");
    forget.style.display = "none";
    var signup = document.querySelector(".signup-form");
    signup.style.display = "none";
  });
}*/

/**
 *@function user forget pasword
 */

//This is Duplication, bad practice

/**
 * on windlow load to run
 */

window.onload = function() {
  // A validator to check if the input value is within a specified range
  // The global validator must be added before creating the pristine instance
  /**
   * user signup function
   * @type {Element}
   */
  var singup = document.querySelector(".signup-form");

  var pristine = new Pristine(singup);

  singup.addEventListener("submit", function(e) {
    e.preventDefault();
    var valid = pristine.validate();
    if (valid == true) {
      var data = {};
      data.Name = $getId("Name").value;
      data.Email = $getId("Email").value;
      data.Company = $getId("Company").value;
      data.Address = $getId("Address").value;
      data.Telephone = $getId("Telephone").value;
      data.Password = $getId("Password").value;
      var r = new XMLHttpRequest();
      r.open("POST", "http://localhost:5000/signup", true);
      r.setRequestHeader("Content-type", "application/json");
      r.onreadystatechange = function() {
        // Only run if the request is complete
        if (r.readyState !== 4) return;
        var res = JSON.parse(r.responseText);

        if (res.message) {
          var login = document.querySelector(".login-form");
          login.style.display = "block";
          var forget = document.querySelector(".forget-form");
          forget.style.display = "none";
          var signup = document.querySelector(".signup-form");
          signup.style.display = "none";
          var el = document.querySelector(".login-form .alert.alert-success");
          el.innerHTML +=
            '<p class="msg"><strong>Success!</strong>' + res.message + "</p>";
          var message = document.querySelector(
            ".login-form .alert.alert-success"
          );
          message.style.display = "block";
          setTimeout(function() {
            var hide_msg = document.querySelector(
              ".login-form .alert.alert-success"
            );
            message.style.display = "none";
            document
              .querySelector(".login-form .alert.alert-success .msg")
              .remove();
          }, 5000);
        } else {
          var el = document.querySelector(".signup-form .alert.alert-danger");
          el.innerHTML +=
            '<p class="msg"><strong>Sorry!</strong>' + res.error + "</p>";
          var message = document.querySelector(
            ".signup-form .alert.alert-danger"
          );
          message.style.display = "block";
          setTimeout(function() {
            var hide_msg = document.querySelector(
              ".signup-form .alert.alert-danger"
            );
            message.style.display = "none";
            document
              .querySelector(".signup-form .alert.alert-danger .msg")
              .remove();
          }, 5000);
        }
      };
      r.send(JSON.stringify(data));
    }
  });
  /**
   * user login function
   * @type {Element}
   */
  var login_form = document.querySelector(".login-form");

  var login_pristine = new Pristine(login_form);

  login_form.addEventListener("submit", function(e) {
    e.preventDefault();
    var valid = login_pristine.validate();
    if (valid == true) {
      var data = {};

      data.Email = $getId("log_Email").value;
      data.Password = $getId("log_Password").value;

      var user = window.localStorage.getItem("weld_user");
      var token = readCookie("weld_token");
      if (token != null || user != null) {
        console.log("here");
        window.location.href = "http://localhost/vanilajs/dashboard.html";
      } else {
        var r = new XMLHttpRequest();
        r.open("POST", "http://localhost:5000/signin", true);
        r.setRequestHeader("Content-type", "application/json");
        r.onreadystatechange = function() {
          // Only run if the request is complete
          if (r.readyState !== 4) return;

          var res = JSON.parse(r.responseText);
          if (res.message == "Login success") {
            createCookie("weld_token", res.token, 30);
            window.localStorage.setItem("weld_user", JSON.stringify(res.user));
            window.location.href = "http://localhost/vanilajs/dashboard.html";
          } else {
            var el = document.querySelector(".login-form .alert.alert-danger");
            el.innerHTML +=
              '<p class="msg"><strong>Sorry!</strong>' + res.error + "</p>";
            var message = document.querySelector(
              ".login-form .alert.alert-danger"
            );
            message.style.display = "block";
            setTimeout(function() {
              var hide_msg = document.querySelector(
                ".login-form .alert.alert-danger"
              );
              message.style.display = "none";
              document
                .querySelector(".login-form .alert.alert-danger .msg")
                .remove();
            }, 3000);
          }
        };
        r.send(JSON.stringify(data));
      }
    }
  });
  var forget_form = document.querySelector(".forget-form");
  var forget_pristine = new Pristine(forget_form);

  forget_form.addEventListener("submit", function(e) {
    e.preventDefault();
    var valid = forget_pristine.validate();
    if (valid == true) {
      var data = {};
      data.Email = $getId("fog_Email").value;
      var user = window.localStorage.getItem("weld_user");
      var token = readCookie("weld_token");
      if (token != null || user != null) {
        window.location.href = "http://localhost/vanilajs/dashboard.html";
      } else {
        var r = new XMLHttpRequest();
        r.open("POST", "http://localhost:5000/forgot", true);
        r.setRequestHeader("Content-type", "application/json");
        r.onreadystatechange = function() {
          // Only run if the request is complete
          if (r.readyState !== 4) return;

          // var res = JSON.parse(r.responseText)
          var res = JSON.parse(r.responseText);
          console.log(res);
          if (res.message) {
            var el = document.querySelector(
              ".forget-form .alert.alert-success"
            );
            el.innerHTML +=
              '<p class="msg"><strong>Success!</strong>' + res.message + "</p>";
            var message = document.querySelector(
              ".forget-form .alert.alert-success"
            );
            message.style.display = "block";
            setTimeout(function() {
              var hide_msg = document.querySelector(
                ".forget-form .alert.alert-success"
              );
              message.style.display = "none";
              document
                .querySelector(".forget-form .alert.alert-success .msg")
                .remove();
            }, 3000);
            setTimeout(function() {
              window.location.href = "http://localhost/vanilajs/main.html";
            }, 4000);
          } else {
            var el = document.querySelector(".forget-form .alert.alert-danger");
            el.innerHTML += '<p class="msg">' + res.error + "</p>";
            var message = document.querySelector(
              ".forget-form .alert.alert-danger"
            );
            message.style.display = "block";
            setTimeout(function() {
              var hide_msg = document.querySelector(
                ".forget-form .alert.alert-danger"
              );
              message.style.display = "none";
              document
                .querySelector(".forget-form .alert.alert-danger .msg")
                .remove();
            }, 3000);
          }
        };
        r.send(JSON.stringify(data));
      }
    }
  });
};
/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function(field, url) {
  var href = url ? url : window.location.href;
  var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
  var string = reg.exec(href);
  return string ? string[1] : null;
};
