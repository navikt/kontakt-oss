import * as React from 'react';
import { FeatureTogglesProvider } from './providers/FeatureTogglesProvider';
import { KommunerProvider } from './providers/KommunerProvider';
import Router from './Router/Router';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <KommunerProvider>
                    <main id="maincontent">
                        <Router />
                    </main>
                </KommunerProvider>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
