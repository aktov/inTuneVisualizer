const express = require('express');

const app = express();
app.use(express.static('static'));
// ----------------------------------------------------------------- //

// [html/handlebars] //
app.get('/views', (req, res) => {
  res.send('hi');
});

// ----------------------------------------------------------------- //

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000/');
})
