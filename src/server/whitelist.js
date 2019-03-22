const basePath = require('./basePath');
const apiBasePath = '/kontakt-oss-api';

const whitelistUrler = ['/meldInteresse', '/fylkerOgKommuner'];

const whitelist = {};
whitelistUrler.forEach(url => {
    const fraUrl = '^' + basePath('/api' + url);
    const tilUrl = apiBasePath + url;
    whitelist[fraUrl] = tilUrl;
});

module.exports = whitelist;
