import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person2.svg';

export const OppfølgingEnkeltperson = () => (
    <div className="andre-kontaktpunkter__tema">
        <img src={illustrasjon} className="andre-kontaktpunkter__tema-illustrasjon"/>
        <Systemtittel className="blokk-xs">
            Oppfølging av en enkeltperson
        </Systemtittel>
        <Normaltekst className="blokk-xs">Ønsker du å komme i kontakt med NAV angående en enkeltperson? Da kan du ringe arbeidsgivertelefonen som setter deg i kontakt med rett person i NAV.</Normaltekst>
        <Element className="blokk-xs">Her får du svar:</Element>
        <a href="/lenke" className="lenke blokk-xs">
            Arbeidsgivertelefonen
        </a>
    </div>
);
