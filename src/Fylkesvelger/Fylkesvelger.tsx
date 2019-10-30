import React, { FunctionComponent } from 'react';
import { fylker } from '../utils/fylker';
import { Innholdstittel } from 'nav-frontend-typografi';

import './Fylkesvelger.less';
import Banner from '../Banner/Banner';
import Lenkepanel from 'nav-frontend-lenkepanel';

const Fylkesvelger: FunctionComponent = () => (
    <>
        <Banner tekst="Kontakt NAV – arbeidsgiver" />
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
    </>
);

export default Fylkesvelger;
