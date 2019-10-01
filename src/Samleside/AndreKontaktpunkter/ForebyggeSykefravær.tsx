import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person3.svg';
import { Link } from 'react-router-dom';
import { KONTAKTSKJEMA_PATH } from '../../utils/paths';

export const ForebyggeSykefravær = () => (
    <div className="kontaktpunkt-tema">
        <img
            src={illustrasjon}
            className="kontaktpunkt-tema__illustrasjon"
            alt=""
        />
        <Undertittel className="blokk-xs kontaktpunkt-tema__tittel">
            Forebygge sykefravær
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Ønsker du bistand med forebygging av sykefravær eller å hindre
            frafall fra arbeidslivet? Da kan du bruke kontaktskjema.
        </Normaltekst>
        <Element className="blokk-xs">Her får du svar:</Element>
        <Link to={KONTAKTSKJEMA_PATH} className="lenke blokk-xs">
            Kontaktskjema
        </Link>
        <a href={'tel:+4755553336'} className="lenke blokk-xs">
            Arbeidsgivertelefonen
        </a>
    </div>
);
