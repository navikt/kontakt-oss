import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person1.svg';
import { Link } from 'react-router-dom';
import { FYLKESVELGER_PATH, KONTAKTSKJEMA_PATH } from '../../utils/paths';

export const RekrutteringOgInkludering = () => (
    <div className="kontaktpunkt-tema">
        <img src={illustrasjon} className="kontaktpunkt-tema__illustrasjon" alt="" />
        <Undertittel tag="h2" className="blokk-xs kontaktpunkt-tema__tittel">
            Rekruttere og inkludere
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Vurderer du å rekruttere og inkludere nye medarbeidere? Har du spørsmål om tiltak og
            tilrettelegging? Ta kontakt med oss for en uforpliktende prat.
        </Normaltekst>
        <Element tag="p" className="blokk-xs">Kontakt oss:</Element>
        <Link to={KONTAKTSKJEMA_PATH} className="kontaktpunkt-tema__lenke">
            Send kontaktskjema til NAV-kontoret ditt
        </Link>
        <Link to={FYLKESVELGER_PATH} className="kontaktpunkt-tema__lenke">
            Ring en markedskontakt
        </Link>
        <a href={'tel:+4755553336'} className="kontaktpunkt-tema__lenke">
            Ring arbeidsgivertelefonen
        </a>
    </div>
);
