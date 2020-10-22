import * as React from 'react';
import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { BASE_PATH, BEKREFTELSE_PATH, FYLKESVELGER_PATH, KONTAKTSKJEMA_PATH } from '../utils/paths';
import { medFeatureToggles } from '../providers/FeatureTogglesProvider';
import Bekreftelse from '../Bekreftelse/Bekreftelse';
import Kontaktskjema from '../Kontaktskjema/Kontaktskjema';
import Fylkesvelger from '../Fylkesvelger/Fylkesvelger';
import Forside from '../Forside/Forside';

const Router: FunctionComponent = () => {
    return (
        <BrowserRouter basename={BASE_PATH}>
            <Switch>
                <Route exact={true} path="/" component={Forside} />
                <Route exact={true} path={BEKREFTELSE_PATH} component={Bekreftelse} />
                <Route exact={true} path={KONTAKTSKJEMA_PATH} component={Kontaktskjema} />
                <Route exact={true} path={FYLKESVELGER_PATH} component={Fylkesvelger} />
            </Switch>
        </BrowserRouter>
    );
};

export default medFeatureToggles(Router);
