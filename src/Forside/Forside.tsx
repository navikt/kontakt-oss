import React, { FunctionComponent, useEffect } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import { AndreKontaktpunkter } from './AndreKontaktpunkter/AndreKontaktpunkter';
import Banner from '../Banner/Banner';
import Chatlenke from './Chatlenke/Chatlenke';
import { FeatureToggles, medFeatureToggles } from '../providers/FeatureTogglesProvider';
import { sendEvent } from '../amplitude/amplitude';
import Brodsmulesti from '../Brodsmulesti/Brodsmulesti';
import './Forside.less';

export const Forside: FunctionComponent<FeatureToggles> = () => {
    useEffect(() => {
        sendEvent('forside', 'vist');
    });

    return (
        <>
            <Brodsmulesti brodsmuler={[]} />
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
