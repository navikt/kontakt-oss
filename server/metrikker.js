const Prometheus = require('prom-client');
const axios = require('axios');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};


const setUpMetrikker = (intervalInMillis) => {
    const URL = `${envProperties.API_GATEWAY}/kontakt-oss-api/internal/healthcheck`;
    const erOppeGauge = new Prometheus.Gauge({
        name: 'kontakt_oss_api_gw',
        help: 'Status til kontak-oss-api via API-Gateway (sonekrysning). 1 betyr oppe, 0 betyr nede.'
    });

    setInterval( async () => {
        return hentEndepunktStatus(URL).then( status => {
            erOppeGauge.set(status === 200 ? 1 : 0);
        });
    }, intervalInMillis);

    console.log(
        `Det blir hentet status metrikker på endepunktet '${URL}' med interval '${intervalInMillis} ms'`
    );
};

const hentEndepunktStatus = async (url) => {
    const httpClient = axios.create();

    if (envProperties.APIGW_HEADER) {
        httpClient.defaults.headers.common['x-nav-apiKey'] = envProperties.APIGW_HEADER;
    }

    try {
        const response = await httpClient.get(url, {
            withCredentials: true,
        });
        return response.status;
    } catch (error) {
        return error.status;
    }
};

module.exports = { setUpMetrikker };
