import * as React from 'react';
import './App.less';
import { log } from './utils/metricsUtils';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Kontaktskjema</h1>
                <button
                    onClick={() => {
                        log('en.test.event');
                    }}
                >
                    Logg til Grafana
                </button>
            </div>
        );
    }
}

export default App;
