import * as React from 'react';
import './App.less';
import { FeatureTogglesProvider } from './KontaktOss/FeatureTogglesProvider';
import Banner from './Banner/Banner';
import { FylkesinndelingProvider } from './KontaktOss/FylkesinndelingProvider';
import Router from './Router/Router';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <FylkesinndelingProvider>
                    <Banner tekst="Kontakt NAV som arbeidsgiver" />
                    <Router/>
                </FylkesinndelingProvider>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
