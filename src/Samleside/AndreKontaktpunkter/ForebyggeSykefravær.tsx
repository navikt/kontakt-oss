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
<<<<<<< Updated upstream
            Ønsker du hjelp til forebygging av sykevær eller å hindre frafall
            fra arbeidslivet? NAV Arbeidslivssenter samarbeider med virksomheter
            om et mer inkluderende arbeidsliv.
=======
            Trenger du hjelp til å forebygge sykefravær eller frafall i
            virksomheten din? Arbeidslivssentrene gir råd og samarbeider om
            inkludering på arbeidsplassen.
>>>>>>> Stashed changes
        </Normaltekst>
        <Element className="blokk-xs">Her kan du få svar:</Element>
        <Link to={KONTAKTSKJEMA_PATH + '?tema=FOREBYGGE_SYKEFRAVÆR'} className="lenke blokk-xs">
            Send kontaktskjema til NAV Arbeidslivssenter
        </Link>
        <a href={'tel:+4755553336'} className="lenke blokk-xs">
            Ring arbeidsgivertelefonen
        </a>
    </div>
);
