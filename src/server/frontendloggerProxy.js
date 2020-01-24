const basePath = require('./basePath');
const proxy = require('http-proxy-middleware');

const frontendloggerUrlDev = 'https://tjenester-q1.nav.no/frontendlogger';
const frontendloggerUrlProd = 'https://tjenester.nav.no/frontendlogger';

const frontendloggerUrl = process.env.NAIS_CLUSTER_NAME === 'prod-sbs' ? frontendloggerUrlProd : frontendloggerUrlDev;

const proxyConfig = {
    target: frontendloggerUrl,
    changeOrigin: true,
    pathRewrite: {
        ['^' + basePath('/frontendlogger/logger.js')]: "/logger.js",
    }
};

module.exports = proxy(proxyConfig);
