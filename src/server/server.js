const path = require('path');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const getDecorator = require('./decorator');
const Promise = require('promise');
const sonekrysning = require('./sonekrysning');
const basePath = require('./basePath');
const createEnvSettingsFile = require('./envSettings');

const buildPath = path.join(__dirname, '../../build');

app.use(basePath('/api'), sonekrysning);

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

createEnvSettingsFile(path.resolve(`${buildPath}/static/js/settings.js`));

const renderApp = decoratorFragments =>
    new Promise((resolve, reject) => {
        app.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = html => {
    app.use(basePath('/'), express.static(buildPath, { index: false }));

    app.get(basePath('/internal/isAlive'), (req, res) => res.sendStatus(200));
    app.get(basePath('/internal/isReady'), (req, res) => res.sendStatus(200));

    app.get(basePath('/*'), (req, res) => {
        res.send(html);
    });

    app.listen(3000, () => {
        console.log('Server listening on port', 3000);
    });
};

getDecorator()
    .then(renderApp, error => console.log('Kunne ikke hente dekoratør ', error))
    .then(startServer, error => console.log('Kunne ikke rendre app ', error));
