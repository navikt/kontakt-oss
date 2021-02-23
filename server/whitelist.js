const basePath = require('./basePath');
const apiBasePath = '/kontakt-oss-api';

const whitelistApiUrler = ['/meldInteresse', '/fylkerOgKommuner', '/kommuner'];

const whitelist = {
    ['^' + basePath('/api/feature')]: apiBasePath + '/feature', // går ikke med regexp-en under pga query params
};

whitelistApiUrler.forEach((url) => {
    const fraUrl = '^' + basePath('/api' + url) + '(|/)$';
    const tilUrl = apiBasePath + url;
    whitelist[fraUrl] = tilUrl;
});

module.exports = whitelist;
