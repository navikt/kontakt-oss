import React, { FunctionComponent } from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { ReactComponent as Snakkebobler } from './snakkebobler.svg';
import { Systemtittel } from 'nav-frontend-typografi';
import './Chatlenke.less';

const Chatlenke: FunctionComponent = () => (
    <Lenkepanel
        tittelProps="normaltekst"
        className="chatlenke"
        href="https://www.nav.no/person/kontakt-oss/chat/arbeidsgiver"
        border
    >
        <div className="chatlenke__innhold">
            <Snakkebobler />

            <div className="chatlenke__tekst">
                <Systemtittel tag="h2" className="chatlenke__tittel">
                    Spørsmål om permittering i forbindelse med koronaviruset?
                </Systemtittel>
                Chat med NAV
            </div>
        </div>
    </Lenkepanel>
);

export default Chatlenke;
