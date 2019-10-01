const Prometheus = require('prom-client');
const { httpClient } = require('./httpClient');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const setUpMetrikker = (metrikk, intervalInMillis) => {
    const URL = `${envProperties.API_GATEWAY}${metrikk.endepunkt}`;
    console.log(
        `Det blir hentet status metrikker på applikasjon bak url '${URL}' med interval '${intervalInMillis} ms'`
    );

    const erOppeGauge = new Prometheus.Gauge({
        name: metrikk.navn, help: metrikk.beskrivelse
    });

    setInterval( async () => {
        return await hentEndepunktStatusResultat(URL).then( resultat => {
            erOppeGauge.set(resultat.status === 200 ? 1 : 0);
        });
    }, intervalInMillis);
};

const hentEndepunktStatusResultat = async (url) => {
    if (envProperties.APIGW_HEADER) {
        httpClient.defaults.headers.common['x-nav-apiKey'] = envProperties.APIGW_HEADER;
    }

    try {
        const response = await httpClient.get(url, {
            withCredentials: true,
        });
        return endepunktStatusResultat(response.status, response.data, url);
    } catch (error) {
        return endepunktStatusResultat('kall til API feilet', error.message, url);
    }
};

const endepunktStatusResultat = (status, data, url) => {
    return {
        status,
        data,
        url,
    };
};

module.exports = { setUpMetrikker };
