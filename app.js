const express = require("express");

const app = express();

const hostname = "localhost";
const PORT = 3000;

/*-------------------------------------------*/

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/assets"));

/*-------------------------------------------*/

app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.get("/logout", (req, res) => {
  res.render("logout.ejs");
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
