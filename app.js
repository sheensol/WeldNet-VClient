const Bundler = require('parcel-bundler');
const path = require('path');
const express = require("express");
const app = express();

const hostname = "localhost";
const PORT = 3000;

/*-------------------------------------------*/

app.set("view engine", "html");
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/assets');
app.use(express.static(__dirname + "/assets"));

/*-------------------------------------------*/

app.get("/", (req, res) => {
  res.render("main.html", {
    mode: "login"
  });
});

app.get("/login", (req, res) => {
  res.render("main.html", {
    mode: "login"
  });
});

app.get("/signup", (req, res) => {
  res.render("main.html", {
    mode: "signup"
  });
});

app.get("/passwordforgot", (req, res) => {
  res.render("main.html", {
    mode: "passwordforgot"
  });
});

app.get("/logout", (req, res) => {
  console.log(
    "This is where we should invalidate the users record in the database"
  );
  res.redirect("/");
});

app.get("/app", (req, res) => {
  res.render("app.html");
});

app.get("/passwordreset", (req, res) => {
  res.render("passwordreset.html");
});


const entryFile = './assets/main.html';
const options = {};
const bundler = new Bundler(entryFile, options);
app.use(bundler.middleware());


app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
