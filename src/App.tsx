import * as React from 'react';
import './App.less';
import { BrowserRouter, Route } from 'react-router-dom';
import KontaktOss from './KontaktOss/KontaktOss';
import { FeatureTogglesProvider } from './KontaktOss/FeatureTogglesProvider';
import Banner from './Banner/Banner';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <Banner tekst="Kom i kontakt med NAV" />
                <BrowserRouter>
                    {/* TODO: Velg path */}
                    <Route exact={true} path="/" component={KontaktOss} />
                </BrowserRouter>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
