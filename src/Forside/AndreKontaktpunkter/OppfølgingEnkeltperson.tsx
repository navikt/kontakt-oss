import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person2.svg';

export const OppfølgingEnkeltperson = () => (
    <div className="kontaktpunkt-tema">
        <img src={illustrasjon} className="kontaktpunkt-tema__illustrasjon" alt="" />
        <Undertittel tag="h2" className="blokk-xs kontaktpunkt-tema__tittel">
            Følge opp en medarbeider
        </Undertittel>
        <Normaltekst tag="p" className="blokk-xs">
            Gjelder henvendelsen din en medarbeider? Arbeidsgivertelefonen kan hjelpe deg videre.
        </Normaltekst>
        <Element tag="p" className="blokk-xs">Kontakt oss:</Element>
        <a href={'tel:+4755553336'} className="kontaktpunkt-tema__lenke">
            Ring arbeidsgivertelefonen
        </a>
    </div>
);
