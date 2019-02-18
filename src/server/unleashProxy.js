const proxy = require('http-proxy-middleware');
const basePath = require('./basePath');

const proxyConfig = {
    changeOrigin: true,
    pathRewrite: {
        ['^' + basePath('/features')]: `/`,
    },
    target: 'https://unleashproxy.prod-sbs.nais.io/api/features',
    secure: true,
    xfwd: true,
};

module.exports = proxy(proxyConfig);
