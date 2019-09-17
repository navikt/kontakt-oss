import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person3.svg';

export const ForebyggeSykefravær = () => (
    <div className="andre-kontaktpunkter__tema">
        <img src={illustrasjon} className="andre-kontaktpunkter__tema-illustrasjon"/>
        <Systemtittel className="blokk-xs">Forebygge sykefravær</Systemtittel>
        <Normaltekst className="blokk-xs">
            Ønsker du bistand med forebygging av sykefravær eller å hindre
            frafall fra arbeidslivet? Da kan du bruke kontaktskjema.
        </Normaltekst>
        <Element className="blokk-xs">Her får du svar:</Element>
        <a href="/lenke" className="lenke blokk-xs">
            Kontaktskjema
        </a>
        <a href="/lenke" className="lenke blokk-xs">
            Arbeidsgivertelefonen
        </a>
    </div>
);
