import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import FellesFelter from './FellesFelter/FellesFelter';
import LenkepanelKontaktliste from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import Feilmelding from './Feilmelding/Feilmelding';
import './Kontaktskjema.less';
import { Normaltekst } from 'nav-frontend-typografi';
import { KontaktskjemaProps } from './KontaktskjemaContainer';

const KontaktskjemaStandard: React.FunctionComponent<
    KontaktskjemaProps
> = props => {
    const fylke = props.besvarelse.fylke;

    const vilDuHellerRinge = (
        <LenkepanelKontaktliste
            tittel="Vil du heller ringe?"
            undertekst="Kontakt en av våre medarbeidere direkte."
            sendMetrikk={true}
            fylke={fylke}
        />
    );

    return (
        <div className="kontaktskjema">
            <form className="kontaktskjema__innhold">
                <FellesFelter
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    besvarelse={props.besvarelse}
                />
                <Infoboks>
                    <Normaltekst>
                        NAV bruker disse opplysningene når vi kontakter deg. Vi
                        lagrer disse opplysningene om deg, slik at vi kan
                        kontakte deg om rekruttering og inkludering i bedriften
                        du representerer. Opplysningene blir ikke delt eller
                        brukt til andre formål.
                    </Normaltekst>
                </Infoboks>
                {props.feilmelding && (
                    <Feilmelding className="kontaktskjema__feilmelding">
                        {props.feilmelding}
                    </Feilmelding>
                )}
                <Hovedknapp
                    onClick={props.sendInnOnClick}
                    data-testid="sendinn"
                    className={'kontaktskjema__knapp'}
                >
                    Send inn
                </Hovedknapp>
                {fylke && vilDuHellerRinge}
            </form>
        </div>
    );
};

export default KontaktskjemaStandard;
