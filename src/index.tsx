import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { unregister } from './utils/serviceWorker';
import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: "https://52f2375c2315491592c2ada9202d226e@sentry.gc.nav.no/54",
    environment: (window as any).appSettings.MILJO,
    enabled: (window as any).appSettings.MILJO !== 'lokalt',
});

if (process.env.REACT_APP_MOCK) {
    console.log('========================================');
    console.log('=============== MED MOCK ===============');
    console.log('===DETTE SKAL DU IKKE SE I PRODUKSJON===');
    console.log('========================================');
    require('./mocking/mock');
}

ReactDOM.render(<App />, document.getElementById('root'));

unregister();
