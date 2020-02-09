// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
var loginForm = document.querySelector(".login-form");
var forgetForm = document.querySelector(".forget-form");
var signupForm = document.querySelector(".signup-form"); //This is Duplication, bad practice

if (mode === "login") {
  loginForm.style.display = "block";
  forgetForm.style.display = "none";
  signupForm.style.display = "none";
}

if (mode === "passwordforgot") {
  loginForm.style.display = "none";
  forgetForm.style.display = "block";
  signupForm.style.display = "none";
} //This is Duplication, bad practice


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


window.onload = function () {
  // A validator to check if the input value is within a specified range
  // The global validator must be added before creating the pristine instance

  /**
   * user signup function
   * @type {Element}
   */
  var singup = document.querySelector(".signup-form");
  var pristine = new Pristine(singup);
  singup.addEventListener("submit", function (e) {
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

      r.onreadystatechange = function () {
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
          el.innerHTML += '<p class="msg"><strong>Success!</strong>' + res.message + "</p>";
          var message = document.querySelector(".login-form .alert.alert-success");
          message.style.display = "block";
          setTimeout(function () {
            var hide_msg = document.querySelector(".login-form .alert.alert-success");
            message.style.display = "none";
            document.querySelector(".login-form .alert.alert-success .msg").remove();
          }, 5000);
        } else {
          var el = document.querySelector(".signup-form .alert.alert-danger");
          el.innerHTML += '<p class="msg"><strong>Sorry!</strong>' + res.error + "</p>";
          var message = document.querySelector(".signup-form .alert.alert-danger");
          message.style.display = "block";
          setTimeout(function () {
            var hide_msg = document.querySelector(".signup-form .alert.alert-danger");
            message.style.display = "none";
            document.querySelector(".signup-form .alert.alert-danger .msg").remove();
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
  login_form.addEventListener("submit", function (e) {
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

        r.onreadystatechange = function () {
          // Only run if the request is complete
          if (r.readyState !== 4) return;
          var res = JSON.parse(r.responseText);

          if (res.message == "Login success") {
            createCookie("weld_token", res.token, 30);
            window.localStorage.setItem("weld_user", JSON.stringify(res.user));
            window.location.href = "http://localhost/vanilajs/dashboard.html";
          } else {
            var el = document.querySelector(".login-form .alert.alert-danger");
            el.innerHTML += '<p class="msg"><strong>Sorry!</strong>' + res.error + "</p>";
            var message = document.querySelector(".login-form .alert.alert-danger");
            message.style.display = "block";
            setTimeout(function () {
              var hide_msg = document.querySelector(".login-form .alert.alert-danger");
              message.style.display = "none";
              document.querySelector(".login-form .alert.alert-danger .msg").remove();
            }, 3000);
          }
        };

        r.send(JSON.stringify(data));
      }
    }
  });
  var forget_form = document.querySelector(".forget-form");
  var forget_pristine = new Pristine(forget_form);
  forget_form.addEventListener("submit", function (e) {
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

        r.onreadystatechange = function () {
          // Only run if the request is complete
          if (r.readyState !== 4) return; // var res = JSON.parse(r.responseText)

          var res = JSON.parse(r.responseText);
          console.log(res);

          if (res.message) {
            var el = document.querySelector(".forget-form .alert.alert-success");
            el.innerHTML += '<p class="msg"><strong>Success!</strong>' + res.message + "</p>";
            var message = document.querySelector(".forget-form .alert.alert-success");
            message.style.display = "block";
            setTimeout(function () {
              var hide_msg = document.querySelector(".forget-form .alert.alert-success");
              message.style.display = "none";
              document.querySelector(".forget-form .alert.alert-success .msg").remove();
            }, 3000);
            setTimeout(function () {
              window.location.href = "http://localhost/vanilajs/main.html";
            }, 4000);
          } else {
            var el = document.querySelector(".forget-form .alert.alert-danger");
            el.innerHTML += '<p class="msg">' + res.error + "</p>";
            var message = document.querySelector(".forget-form .alert.alert-danger");
            message.style.display = "block";
            setTimeout(function () {
              var hide_msg = document.querySelector(".forget-form .alert.alert-danger");
              message.style.display = "none";
              document.querySelector(".forget-form .alert.alert-danger .msg").remove();
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


var getQueryString = function getQueryString(field, url) {
  var href = url ? url : window.location.href;
  var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
  var string = reg.exec(href);
  return string ? string[1] : null;
};
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49503" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map