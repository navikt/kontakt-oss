import * as React from 'react';
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktOss from './KontaktOss/KontaktOss';
import { FeatureTogglesProvider } from './KontaktOss/FeatureTogglesProvider';
import Banner from './Banner/Banner';
import Bekreftelse from './KontaktOss/Kontaktskjema/Bekreftelse/Bekreftelse';
import { BASE_PATH, BEKREFTELSE_PATH } from './utils/paths';
import { KommuneProvider } from './KontaktOss/KommuneProvider';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <KommuneProvider>
                    <Banner tekst="Kom i kontakt med NAV" />
                    <BrowserRouter basename={BASE_PATH}>
                        <Switch>
                            <Route exact={true} path="/" component={KontaktOss} />
                            <Route
                                exact={true}
                                path={BEKREFTELSE_PATH}
                                component={Bekreftelse}
                            />
                        </Switch>
                    </BrowserRouter>
                </KommuneProvider>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
