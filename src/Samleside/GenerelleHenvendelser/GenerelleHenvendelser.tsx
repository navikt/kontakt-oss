import * as React from 'react';
import { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './GenerelleHenvendelser.less';
import { Arbeidsgivertelefonen } from './Arbeidsgivertelefonen/Arbeidsgivertelefonen';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

export const GenerelleHenvendelser: FunctionComponent = () => {
    return (
        <PanelBase className="generelle-henvendelser">
            <div className="generelle-henvendelser__tekst">
                <Systemtittel
                    tag="h2"
                    className="generelle-henvendelser__tittel"
                >
                    Arbeidsgivertelefonen
                </Systemtittel>
                <Normaltekst>
                    Hos arbeidsgivertelefonen får du generell informasjon,
                    opplysning om status i sak og veiledning i bruk av
                    selvbetjente løsninger. Vi hjelper deg også med å komme i
                    kontakt med andre veiledere i NAV.
                </Normaltekst>
            </div>
            <Arbeidsgivertelefonen className="generelle-henvendelser__arbeidsgivertelefonen" />
        </PanelBase>
    );
};
