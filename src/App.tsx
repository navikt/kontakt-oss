import * as React from 'react';
import { FeatureTogglesProvider } from './providers/FeatureTogglesProvider';
import Router from './Router/Router';
import {GlobalFeilProvider} from "./providers/GlobalFeilProvider";

class App extends React.Component {
    render() {
        return (
            <GlobalFeilProvider>
                <FeatureTogglesProvider>
                    <main id="maincontent">
                        <Router />
                    </main>
                </FeatureTogglesProvider>
            </GlobalFeilProvider>
        );
    }
}

export default App;
