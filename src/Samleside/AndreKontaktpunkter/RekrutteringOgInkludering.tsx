import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import illustrasjon from './person1.svg';

export const RekrutteringOgInkludering = () => (
    <div className="andre-kontaktpunkter__tema">
        <img
            src={illustrasjon}
            className="andre-kontaktpunkter__tema-illustrasjon"
            alt="Anleggsarbeider"
        />
        <Undertittel className="blokk-xs andre-kontaktpunkter__tema-tittel">
            Rekruttering og inkludering
        </Undertittel>
        <Normaltekst className="blokk-xs">
            Rekruttere nye medarbeidere? Få svar på spørsmål om tilskudd,
            oppfølging og tilrettelegging? Du kan bruke kontaktskjema eller
            kontakte en av NAVs markedskontakter i ditt fylke direkte gjennom
            telefonlistene.
        </Normaltekst>
        <Element className="blokk-xs">Her får du svar:</Element>
        <a href="/lenke" className="lenke blokk-xs">
            Kontaktskjema
        </a>
        <a href="/lenke" className="lenke blokk-xs">
            Telefonlister
        </a>
        <a href="/lenke" className="lenke blokk-xs">
            Arbeidsgivertelefonen
        </a>
    </div>
);
