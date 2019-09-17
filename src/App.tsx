import * as React from 'react';
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KontaktOss from './KontaktOss/KontaktOss';
import { FeatureTogglesProvider } from './KontaktOss/FeatureTogglesProvider';
import Banner from './Banner/Banner';
import Bekreftelse from './KontaktOss/Kontaktskjema/Bekreftelse/Bekreftelse';
import { BASE_PATH, BEKREFTELSE_PATH, FYLKESVELGER_PATH } from './utils/paths';
import { FylkesinndelingProvider } from './KontaktOss/FylkesinndelingProvider';
import { Fylkesvelger } from './Fylkesvelger/Fylkesvelger';

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
                                path={FYLKESVELGER_PATH}
                                component={Fylkesvelger}
                            />
                        </Switch>
                    </BrowserRouter>
                </FylkesinndelingProvider>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
