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
            Forebygging av sykefravær
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Ønsker du bistand til forebygging av sykevær eller å hindre frafall
            fra arbeidslivet? NAV Arbeidslivssenter samarbeider med virksomheter
            om et mer inkluderende arbeidsliv.
        </Normaltekst>
        <Element className="blokk-xs">Her kan du få svar:</Element>
        <Link to={KONTAKTSKJEMA_PATH} className="lenke blokk-xs">
            Send kontaktskjema til NAV Arbeidslivssenter
        </Link>
        <a href={'tel:+4755553336'} className="lenke blokk-xs">
            Ring arbeidsgivertelefonen
        </a>
    </div>
);
