import illustrasjon from './illustrasjon1.svg';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';

export const RekrutteringOgInkludering = () => (
    <div className="andre-kontaktpunkter__tema">
        <img src={illustrasjon} />
        <Systemtittel className="blokk-xs">
            {' '}
            Rekruttering og inkludering
        </Systemtittel>
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
