import React, { FunctionComponent, useEffect } from 'react';
import { fylker } from '../utils/fylker';
import { Innholdstittel } from 'nav-frontend-typografi';

import './Fylkesvelger.less';
import Banner from '../Banner/Banner';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { scrollToBanner } from '../utils/scrollUtils';
import { sendEvent } from '../amplitude/amplitude';

const Fylkesvelger: FunctionComponent = () => {
    useEffect(() => {
        scrollToBanner();
        sendEvent('fylkesvelger', 'vist');
    }, []);

    return (
        <>
            <Banner tekst="Kontakt NAV – arbeidsgiver" />
            <div className="fylkesvelger">
                <Innholdstittel className="fylkesvelger__tittel" tag="h2">
                    Velg fylke
                </Innholdstittel>
                <ul className="fylkesvelger__lenkeliste">
                    {fylker.map((fylke) => (
                        <li key={fylke.nokkel}>
                            <Lenkepanel
                                tittelProps="undertittel"
                                href={fylke.hrefKontaktliste}
                                className="fylkesvelger__fylke"
                                border
                            >
                                {fylke.navn}
                            </Lenkepanel>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Fylkesvelger;
