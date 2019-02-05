import * as React from 'react';
import './App.less';
import { logError, logEvent } from './utils/metricsUtils';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Kontaktskjema</h1>
                <button
                    onClick={() => {
                        logEvent('kontakt-oss.en.test.event');
                    }}
                >
                    Logg event
                </button>
                <button
                    onClick={() => {
                        logError('En feil har skjedd.');
                    }}
                >
                    Logg til Grafana
                </button>
            </div>
        );
    }
}

export default App;
