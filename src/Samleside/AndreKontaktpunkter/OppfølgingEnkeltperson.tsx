import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person2.svg';

export const OppfølgingEnkeltperson = () => (
    <div className="kontaktpunkt-tema">
        <img
            src={illustrasjon}
            className="kontaktpunkt-tema__illustrasjon"
            alt=""
        />
        <Undertittel className="blokk-xs kontaktpunkt-tema__tittel">
            Oppfølging av en enkeltperson
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Ønsker du å komme i kontakt med NAV angående en enkeltperson? Da kan
            du ringe arbeidsgivertelefonen som setter deg i kontakt med rett
            person i NAV.
        </Normaltekst>
        <Element className="blokk-xs">Her får du svar:</Element>
        <a href={'tel:+4755553336'} className="lenke blokk-xs">
            Arbeidsgivertelefonen
        </a>
    </div>
);
