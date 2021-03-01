import * as React from 'react';
import { FeatureTogglesProvider } from './providers/FeatureTogglesProvider';
import { KommunerProvider } from './providers/KommunerProvider';
import Router from './Router/Router';
import {GlobalFeilProvider} from "./providers/GlobalFeilProvider";

class App extends React.Component {
    render() {
        return (
            <GlobalFeilProvider>
                <FeatureTogglesProvider>
                    <KommunerProvider>
                        <main id="maincontent">
                            <Router />
                        </main>
                    </KommunerProvider>
                </FeatureTogglesProvider>
            </GlobalFeilProvider>
        );
    }
}

export default App;
