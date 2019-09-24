import { BASE_PATH, BEKREFTELSE_PATH, FYLKESVELGER_PATH, KONTAKTSKJEMA_PATH, } from '../utils/paths';
import { Route, Switch } from 'react-router';
import KontaktOss from '../KontaktOss/KontaktOss';
import Bekreftelse from '../KontaktOss/Kontaktskjema/Bekreftelse/Bekreftelse';
import NyttKontaktskjema from '../Kontaktskjema/Kontaktskjema';
import Fylkesvelger from '../Fylkesvelger/Fylkesvelger';
import Samleside from '../Samleside/Samleside';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { FeatureToggle, FeatureToggles, medFeatureToggles, } from '../KontaktOss/FeatureTogglesProvider';

const Router: FunctionComponent<FeatureToggles> = props => {
    const forside = props[FeatureToggle.NyttUtseendeFeature] ? Samleside : KontaktOss;

    return (
        <BrowserRouter basename={BASE_PATH}>
            <Switch>
                <Route exact={true} path="/" component={forside} />
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
            </Switch>
        </BrowserRouter>
    );
};

export default medFeatureToggles(Router);
