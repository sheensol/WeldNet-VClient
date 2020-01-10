const express = require("express");

const app = express();

const hostname = "localhost";
const PORT = 3000;

/*-------------------------------------------*/

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/assets"));

/*-------------------------------------------*/

app.get("/", (req, res) => {
  res.render("main.ejs", {
    mode: "login"
  });
});

app.get("/login", (req, res) => {
  res.render("main.ejs", {
    mode: "login"
  });
});

app.get("/signup", (req, res) => {
  res.render("main.ejs", {
    mode: "signup"
  });
});

app.get("/passwordforgot", (req, res) => {
  res.render("main.ejs", {
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
  res.render("app.ejs");
});

app.get("/passwordreset", (req, res) => {
  res.render("passwordreset.ejs");
});

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
