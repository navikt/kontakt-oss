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
            Oppfølging av enkeltperson
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Dersom henvendelsen din gjelder en enkeltperson kan du ringe
            arbeidsgivertelefonen som hjelper deg videre.
        </Normaltekst>
        <Element className="blokk-xs">Her få du svar:</Element>
        <a href={'tel:+4755553336'} className="lenke blokk-xs">
            Ring arbeidsgivertelefonen
        </a>
    </div>
);
