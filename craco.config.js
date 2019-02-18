const CracoLessPlugin = require('craco-less');

module.exports = {
    devServer: {
        before: app => {
            app.get('/frontendlogger/logger.js', (req, res) => {
                res.json({});
            });

            app.get('/kontakt-oss/static/js/settings.js', (req, res) => {
                res.send("window.appSettings = {MILJO: 'lokalt'};");
            });
            // TODO: Konfigurer slik at {{{NAV_STYLES}}} ++ fjernes
            // https://webpack.js.org/configuration/dev-server/
            // https://github.com/navikt/foreldrepengeplanlegger/blob/master/src/build/webpack/devserver.config.js
        },
    },
    plugins: [{ plugin: CracoLessPlugin }],
};
