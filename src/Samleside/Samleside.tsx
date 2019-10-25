import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import './Samleside.less';
import { AndreKontaktpunkter } from './AndreKontaktpunkter/AndreKontaktpunkter';
import { FeatureToggles } from '../providers/FeatureTogglesProvider';
import Banner from '../Banner/Banner';

export const Samleside: FunctionComponent<FeatureToggles> = () => (
    <>
        <Banner tekst="Kontakt NAV – arbeidsgiver" />
        <div className="samleside">
            <GenerelleHenvendelser />
            <AndreKontaktpunkter />
        </div>
    </>
);

export default Samleside;
