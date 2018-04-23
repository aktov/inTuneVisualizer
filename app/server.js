const express = require('express');
/*
const http = require('http');
const path = require('path');
const handlebars = require('express3-handlebars')
*/
const app = express();
app.use(express.static('static'));
// ----------------------------------------------------------------- //

/*
// [javascript] //
const index = require('./static/views/index');
*/

// [html/handlebars] //
app.get('/views', (req, res) => {
  res.send('hi');
});

// ----------------------------------------------------------------- //

// all environments
/*app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
*/

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000/');
})
