import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import './Samleside.less';
import { AndreKontaktpunkter } from './AndreKontaktpunkter/AndreKontaktpunkter';
import { FeatureToggle, FeatureToggles, medFeatureToggles } from '../KontaktOss/FeatureTogglesProvider';

export const Samleside: FunctionComponent<FeatureToggles> = (props) => {
    if (!props[FeatureToggle.NyttUtseendeFeature]) {
        return null;
    }

    return (
        <div className="samleside">
            <GenerelleHenvendelser/>
            <AndreKontaktpunkter/>
        </div>
    );
};

export default medFeatureToggles(Samleside);
