import * as React from 'react';
import { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './GenerelleHenvendelser.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Arbeidsgivertelefonen } from './Arbeidsgivertelefonen/Arbeidsgivertelefonen';

export const GenerelleHenvendelser: FunctionComponent = () => {
    return (
        <PanelBase className="generelle-henvendelser">
            <div className="generelle-henvendelser__tekst">
                <Systemtittel
                    tag="h2"
                    className="generelle-henvendelser__tittel"
                >
                    Generell informasjon
                </Systemtittel>
                <Normaltekst>
                    Arbeidsgivertelefonen gir generell informasjon, opplysning
                    om status i en sak og veiledning i selvbetjente løsninger.
                    Vi hjelper deg også med å komme i kontakt med andre
                    veiledere i NAV.
                </Normaltekst>
            </div>
            <Arbeidsgivertelefonen className="generelle-henvendelser__arbeidsgivertelefonen" />
        </PanelBase>
    );
};
