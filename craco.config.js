const CracoLessPlugin = require('craco-less');
const proxy = require('http-proxy-middleware');

const apiProxyPath = '/kontakt-oss/api';

module.exports = {
    devServer: {
        before: app => {
            app.get('/kontakt-oss/frontendlogger/logger.js', (req, res) => {
                res.json({});
            });

            app.use(
                proxy(apiProxyPath, {
                    target: 'http://localhost:8080/kontakt-oss-api',
                    changeOrigin: true,
                    pathRewrite: (path, req) => path.replace(apiProxyPath, ''),
                })
            );

            app.get('/kontakt-oss/static/js/settings.js', (req, res) => {
                res.send("window.appSettings = {MILJO: 'lokalt'};");
            });
        },
    },
    plugins: [{ plugin: CracoLessPlugin }],
    eslint: {
        enable: true,
        mode: 'extends',
        configure: {
            extends: 'react-app',
            rules: {
                // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ: https://github.com/yannickcr/eslint-plugin-react/issues/1654
                'react/jsx-pascal-case': 'off',
            },
        },
    },
};
