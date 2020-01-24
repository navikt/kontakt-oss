const basePath = require('./basePath');
const apiBasePath = '/kontakt-oss-api';

const whitelistApiUrler = ['/meldInteresse', '/fylkerOgKommuner'];

const frontendloggerUrlDev = 'https://tjenester-q0.nav.no/frontendlogger';
const frontendloggerUrlProd = 'https://tjenester.nav.no/frontendlogger';

const frontendloggerUrl = process.env.NAIS_CLUSTER_NAME === 'prod-sbs' ? frontendloggerUrlProd : frontendloggerUrlDev;

const whitelist = {
    ['^' + basePath('/api/feature')]: apiBasePath + '/feature', // går ikke med regexp-en under pga query params
    ['^' + basePath('/frontendlogger')]: frontendloggerUrl,
};

whitelistApiUrler.forEach(url => {
    const fraUrl = '^' + basePath('/api' + url) + '(|/)$';
    const tilUrl = apiBasePath + url;
    whitelist[fraUrl] = tilUrl;
});

module.exports = whitelist;
