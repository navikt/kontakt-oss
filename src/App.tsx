import * as React from 'react';
import './App.less';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Kontaktskjema</h1>
        <button onClick={() => {
            (window as any).frontendLogger.event('en.test.event');
        }}>
            Logg til Grafana
        </button>
      </div>
    );
  }
}

export default App;
