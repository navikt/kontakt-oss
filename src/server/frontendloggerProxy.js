const basePath = require('./basePath');
const proxy = require('http-proxy-middleware');

const frontendloggerUrl = process.env.NAIS_CLUSTER_NAME === 'prod-sbs'
    ? 'https://tjenester-q1.nav.no/frontendlogger'
    : 'https://tjenester-q1.nav.no/frontendlogger';

const proxyConfig = {
    target: frontendloggerUrl,
    changeOrigin: true,
    pathRewrite: {
        ['^' + basePath('/frontendlogger/logger.js')]: "/logger.js",
    }
};

module.exports = proxy(proxyConfig);
