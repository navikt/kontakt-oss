import * as React from 'react';
import './App.less';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import KontaktOss from './KontaktOss/KontaktOss';
import { FeatureTogglesProvider } from './KontaktOss/FeatureTogglesProvider';
import Banner from './Banner/Banner';
import { BASE_PATH, BEKREFTELSE_PATH } from './utils/konstanter';
import Bekreftelse from './KontaktOss/Kontaktskjema/Bekreftelse/Bekreftelse';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <Banner tekst="Kom i kontakt med NAV" />
                <BrowserRouter basename={BASE_PATH}>
                    <Switch>
                        <Route exact={true} path="/" component={KontaktOss} />
                        <Route
                            exact={true}
                            path={BEKREFTELSE_PATH}
                            component={Bekreftelse}
                        />
                        <Redirect to="/" />
                    </Switch>
                </BrowserRouter>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
