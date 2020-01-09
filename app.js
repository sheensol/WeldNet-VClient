const express = require('express');

const app = express();

const hostname = 'localhost';
const PORT = 3000;

/*-------------------------------------------*/

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

/*-------------------------------------------*/

app.get('/', (req,res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('main.ejs');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs');
});

app.get('/pass', (req, res) => {
    res.render('forgetpassword.ejs');
});




app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });