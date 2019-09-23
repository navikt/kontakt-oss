import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person1.svg';
import { Link } from 'react-router-dom';
import { FYLKESVELGER_PATH, KONTAKTSKJEMA_PATH } from '../../utils/paths';

export const RekrutteringOgInkludering = () => (
    <div className="kontaktpunkt-tema">
        <img
            src={illustrasjon}
            className="kontaktpunkt-tema__illustrasjon"
            alt=""
        />
        <Undertittel className="blokk-xs kontaktpunkt-tema__tittel">
            Rekruttering og inkludering
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Rekruttere nye medarbeidere? Få svar på spørsmål om tilskudd,
            oppfølging og tilrettelegging? Du kan bruke kontaktskjema eller
            kontakte en av NAVs markedskontakter i ditt fylke direkte gjennom
            telefonlistene.
        </Normaltekst>
        <Element className="blokk-xs">Her får du svar:</Element>
        <Link to={KONTAKTSKJEMA_PATH} className="lenke blokk-xs">
            Kontaktskjema
        </Link>
        <Link to={FYLKESVELGER_PATH} className="lenke blokk-xs">
            Telefonlister
        </Link>
        <a href={'tel:+4755553336'} className="lenke blokk-xs">
            Arbeidsgivertelefonen
        </a>
    </div>
);
