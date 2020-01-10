var update_password_form = document.querySelector(".update_password_form");
var update_pass_pristine = new Pristine(update_password_form);
update_password_form.addEventListener("submit", function(e) {
  e.preventDefault();

  // A validator to check if the first letter is capitalized
  var pass = document.querySelector("#new_Password").value;
  var elem = document.querySelector("#confirm_Password");

  update_pass_pristine.addValidator(
    elem,
    function(value, el) {
      if (value.length && value === pass) {
        return true;
      }
      return false;
    },
    "Confirm password not match with password",
    2,
    false
  );
  var valid = update_pass_pristine.validate();
  if (valid == true) {
    var data = {};
    data.token = getQueryString("token", window.location.href);
    data.Password = document.querySelector("#new_Password").value;
    var r = new XMLHttpRequest();
    r.open("POST", "http://localhost:5000/reset", true);
    r.setRequestHeader("Content-type", "application/json");
    r.onreadystatechange = function() {
      // Only run if the request is complete
      if (r.readyState !== 4) return;

      var res = JSON.parse(r.responseText);
      if (res.message) {
        var el = document.querySelector(
          ".update_password_form .alert.alert-success"
        );
        el.innerHTML +=
          '<p class="msg"><strong>Success!</strong>' + res.message + "</p>";
        var message = document.querySelector(
          ".update_password_form .alert.alert-success"
        );
        message.style.display = "block";
        setTimeout(function() {
          var hide_msg = document.querySelector(
            ".update_password_form .alert.alert-success"
          );
          message.style.display = "none";
          document
            .querySelector(".update_password_form .alert.alert-success .msg")
            .remove();
        }, 3000);
        setTimeout(function() {
          window.location.href = "http://localhost/vanilajs/main.html";
        }, 4000);
      } else {
        var el = document.querySelector(
          ".update_password_form .alert.alert-danger"
        );
        el.innerHTML += '<p class="msg">' + res.error + "</p>";
        var message = document.querySelector(
          ".update_password_form .alert.alert-danger"
        );
        message.style.display = "block";
        setTimeout(function() {
          var hide_msg = document.querySelector(
            ".update_password_form .alert.alert-danger"
          );
          message.style.display = "none";
          document
            .querySelector(".update_password_form .alert.alert-danger .msg")
            .remove();
        }, 3000);
      }
    };
    r.send(JSON.stringify(data));
  } else {
    return false;
  }
});
