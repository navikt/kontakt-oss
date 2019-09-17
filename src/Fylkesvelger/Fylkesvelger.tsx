import React, { FunctionComponent } from 'react';
import { fylker } from '../utils/fylker';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FeatureToggle, FeatureToggles, medFeatureToggles } from '../KontaktOss/FeatureTogglesProvider';

import './Fylkesvelger.less';

const Fylkesvelger: FunctionComponent<FeatureToggles> = (props) => {
    if (!props[FeatureToggle.NyttUtseendeFeature]) {
        return null;
    }

    return (
        <div className="fylkesvelger">
            <Innholdstittel className="fylkesvelger__tittel" tag="h2">
                Velg fylke
            </Innholdstittel>
            {fylker.map(fylke => (
                <Lenkepanel
                    tittelProps="undertittel"
                    href={fylke.hrefKontaktliste}
                    className="fylkesvelger__fylke"
                    border
                >
                    {fylke.navn}
                </Lenkepanel>
            ))}
        </div>
    );
};

export default medFeatureToggles(Fylkesvelger);