const CracoLessPlugin = require('craco-less');
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxyPath = '/kontakt-oss/api';

module.exports = {
    devServer: {
        before: app => {
            app.use(
                createProxyMiddleware(apiProxyPath, {
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
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
            },
            plugins: ['@typescript-eslint'],
            extends: ['plugin:jsx-a11y/recommended'],
            rules: {
                'no-use-before-define': 'off',
                // Kan slås på når react-scripts oppgraderer sin avheigighet til eslint https://github.com/typescript-eslint/typescript-eslint/issues/2540
                '@typescript-eslint/no-use-before-define': ['off'],
            },
        },
    },
};
