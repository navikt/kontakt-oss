const path = require('path');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const getDecorator = require('./decorator');

const buildPath = path.join(__dirname, '../../build');

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);
app.use('/', express.static(buildPath));

getDecorator().then((decorator) => {
  app.get('/*', (req, res) => {
    res.render('index.html', Object.assign(decorator));
  });

  app.listen(3000, () => {
    console.log('Server listening on port', 3000);
  });
});
