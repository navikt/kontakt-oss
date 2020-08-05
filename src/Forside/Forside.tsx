import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import './Forside.less';
import { AndreKontaktpunkter } from './AndreKontaktpunkter/AndreKontaktpunkter';
import Banner from '../Banner/Banner';
import Chatlenke from './Chatlenke/Chatlenke';
import { FeatureToggles, medFeatureToggles } from '../providers/FeatureTogglesProvider';
import { sendEvent } from '../amplitude/amplitude';

export const Forside: FunctionComponent<FeatureToggles> = () => {
    useEffect(() => {
        sendEvent('forside', 'vist');
    });

    return (
        <>
            <Banner tekst="Kontakt NAV – arbeidsgiver" />
            <div className="forside">
                <Chatlenke />
                <GenerelleHenvendelser />
                <AndreKontaktpunkter />
            </div>
        </>
    );
};

export default medFeatureToggles(Forside);
