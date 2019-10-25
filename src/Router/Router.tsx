import { BASE_PATH, BEKREFTELSE_PATH, FYLKESVELGER_PATH, KONTAKTSKJEMA_PATH } from '../utils/paths';
import { Route, Switch } from 'react-router';
import Bekreftelse from '../Bekreftelse/Bekreftelse';
import Kontaktskjema from '../Kontaktskjema/Kontaktskjema';
import Fylkesvelger from '../Fylkesvelger/Fylkesvelger';
import Samleside from '../Samleside/Samleside';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { medFeatureToggles } from '../providers/FeatureTogglesProvider';

const Router: FunctionComponent = () => {
    return (
        <BrowserRouter basename={BASE_PATH}>
            <Switch>
                <Route exact={true} path="/" component={Samleside} />
                <Route
                    exact={true}
                    path={BEKREFTELSE_PATH}
                    component={Bekreftelse}
                />
                <Route
                    exact={true}
                    path={KONTAKTSKJEMA_PATH}
                    component={Kontaktskjema}
                />
                <Route
                    exact={true}
                    path={FYLKESVELGER_PATH}
                    component={Fylkesvelger}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default medFeatureToggles(Router);
