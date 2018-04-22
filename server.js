const express = require('express');
const app = express();
// ----------------------------------------------------------------- //

// [javascript] //
const index = require('./routes/index');

// [html/handlebars] //
app.get('/', index.view);


// ----------------------------------------------------------------- //
app.use(express.static('static_files/'));

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000/');
})