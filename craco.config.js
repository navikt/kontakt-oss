const CracoLessPlugin = require("craco-less");

module.exports = {
    // TODO: Konfigurer devServer som fjerner NAV dekoratør
    // https://webpack.js.org/configuration/dev-server/
    // https://github.com/navikt/foreldrepengeplanlegger/blob/master/src/build/webpack/devserver.config.js
    plugins: [{ plugin: CracoLessPlugin }]
};
