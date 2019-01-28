const path = require('path');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const getDecorator = require('./decorator');
const Promise = require('promise');

const buildPath = path.join(__dirname, '../../build');

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const renderApp = (decoratorFragments) =>
    new Promise((resolve, reject) => {
      app.render('index.html', Object.assign(decoratorFragments), (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });

const startServer = (html) => {
    app.use('/kontakt-oss/static/js', express.static(path.join(buildPath, 'static/js')));
    app.use('/kontakt-oss/static/css', express.static(path.join(buildPath, 'static/css')));
    app.use('/service-worker.js', express.static(path.join(buildPath, 'service-worker.js')));

    app.get(['/', '/kontakt-oss/?', /^\/kontakt-oss\/(?!.*static).*$/], (req, res) => {
        res.send(html);
    });

    app.get('/kontakt-oss/internal/isAlive', (req, res) => res.sendStatus(200));
    app.get('/kontakt-oss/internal/isReady', (req, res) => res.sendStatus(200));

    app.get(/^\/(?!.*static).*$/, (req, res) => {
        res.send(html);
    });

    app.listen(3000, () => {
        console.log('Server listening on port', 3000);
    });
};

getDecorator()
    .then(renderApp, (error) => console.log('Kunne ikke hente dekoratør ', error))
    .then(startServer, (error) => console.log('Kunne ikke rendre app ', error));
