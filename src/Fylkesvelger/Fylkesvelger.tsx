import React from 'react';
import { fylker } from '../utils/fylker';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';

import './Fylkesvelger.less';
import { Sidetittel } from 'nav-frontend-typografi';

export const Fylkesvelger = () => {
    return (
        <div className="fylkesvelger">
            <Sidetittel className="fylkesvelger__tittel" tag="h2">
                Velg fylke
            </Sidetittel>
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
