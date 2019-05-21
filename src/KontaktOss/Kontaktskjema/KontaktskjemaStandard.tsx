import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import FellesFelter from './FellesFelter/FellesFelter';
import LenkepanelKontaktliste from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import Feilmelding from './Feilmelding/Feilmelding';
import './Kontaktskjema.less';
import { medFylkesinndeling } from '../FylkesinndelingProvider';
import { Normaltekst } from 'nav-frontend-typografi';
import KontaktskjemaStateContainer from './KontaktskjemaStateContainer';

class KontaktskjemaStandard extends KontaktskjemaStateContainer {
    render() {
        const fylke = this.state.besvarelse.fylke;

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
                        oppdaterBesvarelse={this.oppdaterBesvarelse}
                        besvarelse={this.state.besvarelse}
                    />
                    <Infoboks>
                        <Normaltekst>
                            NAV bruker disse opplysningene når vi kontakter deg.
                            Vi lagrer disse opplysningene om deg, slik at vi kan
                            kontakte deg om rekruttering og inkludering i
                            bedriften du representerer. Opplysningene blir ikke
                            delt eller brukt til andre formål.
                        </Normaltekst>
                    </Infoboks>
                    {this.state.feilmelding && (
                        <Feilmelding className="kontaktskjema__feilmelding">
                            {this.state.feilmelding}
                        </Feilmelding>
                    )}
                    <Hovedknapp
                        onClick={this.sendInnOnClick}
                        data-testid="sendinn"
                        className={'kontaktskjema__knapp'}
                    >
                        Send inn
                    </Hovedknapp>
                    {fylke && vilDuHellerRinge}
                </form>
            </div>
        );
    }
}

export default medFylkesinndeling(KontaktskjemaStandard);
