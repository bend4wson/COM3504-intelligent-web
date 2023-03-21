const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render("list");
});

app.get('/detail', (req, res) => {
  res.render("detail");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
