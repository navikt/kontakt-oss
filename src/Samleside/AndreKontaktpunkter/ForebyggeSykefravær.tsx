import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person3.svg';
import { Link } from 'react-router-dom';

export const ForebyggeSykefravær = () => (
    <div className="andre-kontaktpunkter__tema">
        <img
            src={illustrasjon}
            className="andre-kontaktpunkter__tema-illustrasjon"
            alt=""
        />
        <Undertittel className="blokk-xs andre-kontaktpunkter__tema-tittel">
            Forebygge sykefravær
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Ønsker du bistand med forebygging av sykefravær eller å hindre
            frafall fra arbeidslivet? Da kan du bruke kontaktskjema.
        </Normaltekst>
        <Element className="blokk-xs">Her får du svar:</Element>
        <Link to="/" className="lenke blokk-xs">
            Kontaktskjema
        </Link>
        <a href={'tel:+4755553336'} className="lenke blokk-xs">
            Arbeidsgivertelefonen
        </a>
    </div>
);
