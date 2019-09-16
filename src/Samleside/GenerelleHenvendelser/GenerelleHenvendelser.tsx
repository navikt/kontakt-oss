import * as React from 'react';
import { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './GenerelleHenvendelser.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Arbeidsgivertelefonen } from './Arbeidsgivertelefonen/Arbeidsgivertelefonen';

export const GenerelleHenvendelser: FunctionComponent = props => {
    return (
        <PanelBase border className="generelle-henvendelser">
            <div className="generelle-henvendelser__tekst">
                <Systemtittel tag="h2" className="generelle-henvendelser__tekst-tittel">Generelle henvendelser</Systemtittel>
                <Normaltekst>
                    Hos arbeidsgivertelefonen kan du får svar på generelle
                    hendvendelser. De kan også hjelpe deg å komme i kontakt med
                    rett person i NAV.
                </Normaltekst>
            </div>
            <Arbeidsgivertelefonen />
        </PanelBase>
    );
};
