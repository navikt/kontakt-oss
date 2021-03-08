import path from 'path';
import fetch from 'node-fetch';
import express from 'express';
import mustacheExpress from 'mustache-express';
import httpProxyMiddleware from "http-proxy-middleware";
import jsdom from "jsdom";
import Prometheus from "prom-client";
import require from "./esm-require.js";

const apiMetricsMiddleware = require('prometheus-api-metrics');
const {JSDOM} = jsdom;
const {createProxyMiddleware} = httpProxyMiddleware;

const defaultDecoratorUrl = 'https://www.nav.no/dekoratoren/?context=arbeidsgiver';
const {
    PORT = 3000,
    NAIS_APP_IMAGE = '?',
    DECORATOR_EXTERNAL_URL = defaultDecoratorUrl,
    NAIS_CLUSTER_NAME = 'local',
    API_GATEWAY = 'http://localhost:8080',
    APIGW_HEADER,
} = process.env;
const decoratorUrl = NAIS_CLUSTER_NAME === 'prod-sbs' ? defaultDecoratorUrl : DECORATOR_EXTERNAL_URL;
const BUILD_PATH = path.join(process.cwd(), '../build');
const getDecoratorFragments = async () => {
    const response = await fetch(decoratorUrl);
    const body = await response.text();
    const {document} = new JSDOM(body).window;
    return {
        HEADER: document.getElementById('header-withmenu').innerHTML,
        FOOTER: document.getElementById('footer-withmenu').innerHTML,
        STYLES: document.getElementById('styles').innerHTML,
        SCRIPTS: document.getElementById('scripts').innerHTML,
        SETTINGS: `<script type="application/javascript">
            window.appSettings = {
                MILJO: '${NAIS_CLUSTER_NAME}',
            }
        </script>`,
    };
}
const startApiGWGauge = () => {
    const gauge = new Prometheus.Gauge({
        name: 'backend_api_gw',
        help: 'Status til backend via API-Gateway (sonekrysning). up=1, down=0',
    });

    setInterval(async () => {
        try {
            const res = await fetch(`${API_GATEWAY}/kontakt-oss-api/internal/healthcheck`, {
                ...(APIGW_HEADER ? {headers: {'x-nav-apiKey': APIGW_HEADER}} : {})
            });
            gauge.set(res.ok ? 1 : 0);
            console.log("healthcheck: ", gauge.name, res.ok);
        } catch (error) {
            console.error("healthcheck error:", gauge.name, error)
            gauge.set(0);
        }
    }, 60 * 1000);
}

const app = express();
app.disable("x-powered-by");
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', BUILD_PATH);

app.use('/*', (req, res, next) => {
    res.setHeader('NAIS_APP_IMAGE', NAIS_APP_IMAGE);
    next();
});
app.use(
    '/kontakt-oss/api',
    createProxyMiddleware({
        changeOrigin: true,
        pathRewrite: {
            '^/kontakt-oss/api/feature': '/kontakt-oss-api/feature',
            '^/kontakt-oss/api/meldInteresse(|/)$': '/kontakt-oss-api/meldInteresse',
            '^/kontakt-oss/api/fylkerOgKommuner(|/)$': '/kontakt-oss-api/fylkerOgKommuner',
            '^/kontakt-oss/api/kommuner(|/)$': '/kontakt-oss-api/kommuner',
        },
        secure: true,
        xfwd: true,
        target: API_GATEWAY,
        ...(APIGW_HEADER ? {headers: {'x-nav-apiKey': APIGW_HEADER}} : {})
    })
);
app.use('/kontakt-oss/', express.static(BUILD_PATH, {index: false}));
app.use(
    apiMetricsMiddleware({
        metricsPath: '/kontakt-oss/internal/metrics',
    })
);

app.get('/kontakt-oss/internal/isAlive', (req, res) => res.sendStatus(200));
app.get('/kontakt-oss/internal/isReady', (req, res) => res.sendStatus(200));

const serve = async () => {
    try {
        const fragments = await getDecoratorFragments();
        app.get('/kontakt-oss/*', (req, res) => {
            res.render('index.html', fragments, (err, html) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    res.send(html);
                }
            });
        });
        app.listen(PORT, () => {
            console.log('Server listening on port ', PORT);
        });
    } catch (error) {
        console.error('Server failed to start ', error);
        process.exit(1);
    }

    startApiGWGauge();
}

serve().then(/*noop*/);