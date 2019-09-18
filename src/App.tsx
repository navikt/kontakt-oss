import * as React from 'react';
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktOss from './KontaktOss/KontaktOss';
import { FeatureTogglesProvider } from './KontaktOss/FeatureTogglesProvider';
import Banner from './Banner/Banner';
import Bekreftelse from './KontaktOss/Kontaktskjema/Bekreftelse/Bekreftelse';
import { BASE_PATH, BEKREFTELSE_PATH, SAMLESIDE_PATH, FYLKESVELGER_PATH, KONTAKTSKJEMA_PATH } from './utils/paths';
import { FylkesinndelingProvider } from './KontaktOss/FylkesinndelingProvider';
import Samleside from './Samleside/Samleside';
import Fylkesvelger from './Fylkesvelger/Fylkesvelger';
import NyttKontaktskjema from './Kontaktskjema/Kontaktskjema';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <FylkesinndelingProvider>
                    <Banner tekst="Kom i kontakt med NAV" />
                    <BrowserRouter basename={BASE_PATH}>
                        <Switch>
                            <Route
                                exact={true}
                                path="/"
                                component={KontaktOss}
                            />
                            <Route
                                exact={true}
                                path={BEKREFTELSE_PATH}
                                component={Bekreftelse}
                            />
                            <Route
                                exact={true}
                                path={KONTAKTSKJEMA_PATH}
                                component={NyttKontaktskjema}
                            />
                            <Route
                                exact={true}
                                path={FYLKESVELGER_PATH}
                                component={Fylkesvelger}
                            />
                            <Route
                                exact={true}
                                path={SAMLESIDE_PATH}
                                component={Samleside}
                            />
                        </Switch>
                    </BrowserRouter>
                </FylkesinndelingProvider>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
