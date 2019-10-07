import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import './Samleside.less';
import { AndreKontaktpunkter } from './AndreKontaktpunkter/AndreKontaktpunkter';
import {
    FeatureToggle,
    FeatureToggles,
    medFeatureToggles,
} from '../KontaktOss/FeatureTogglesProvider';
import Banner from '../Banner/Banner';

export const Samleside: FunctionComponent<FeatureToggles> = props => {
    if (!props[FeatureToggle.NyttUtseendeFeature]) {
        return null;
    }

    return (
        <>
            <Banner tekst="Kontakt NAV – arbeidsgiver" />
            <div className="samleside">
                <GenerelleHenvendelser />
                <AndreKontaktpunkter />
            </div>
        </>
    );
};

export default medFeatureToggles(Samleside);
