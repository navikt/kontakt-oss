const proxy = require('http-proxy-middleware');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const proxyConfig = {
    changeOrigin: true,
    pathRewrite: {
        '^/kontakt-oss/api': `/kontakt-oss-api/api`,
    },
    target: envProperties.API_GATEWAY,
    // TODO: Last inn riktige credentials
    // https://stackoverflow.com/questions/29283040/how-to-add-custom-certificate-authority-ca-to-nodejs
    secure: false,
    xfwd: true,
};

if (envProperties.APIGW_HEADER) {
    proxyConfig.headers = {
        'x-nav-apiKey': envProperties.APIGW_HEADER
    }
}

module.exports = proxy(proxyConfig);
