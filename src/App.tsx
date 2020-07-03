import * as React from 'react';
import { FeatureTogglesProvider } from './providers/FeatureTogglesProvider';
import { FylkesinndelingProvider } from './providers/FylkesinndelingProvider';
import Router from './Router/Router';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <FylkesinndelingProvider>
                    <Router />
                </FylkesinndelingProvider>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
