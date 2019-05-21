import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import Infoboks from '../Infoboks/Infoboks';
import Feilmelding from '../Feilmelding/Feilmelding';
import { medFylkesinndeling } from '../../FylkesinndelingProvider';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

import './kontaktskjemaSykefravær.less';
import FellesFelter from '../FellesFelter/FellesFelter';
import { AnsattrepresentantFelter } from './AnsattrepresentantFelter/AnsattrepresentantFelter';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veilederBilde from '../../ArbeidsgiverTlfIInfo/kvinne.svg';
import KontaktskjemaStateContainer from '../KontaktskjemaStateContainer';

class KontaktskjemaSykefravær extends KontaktskjemaStateContainer {
    render() {
        return (
            <div className="kontaktskjema kontaktskjemaSykefravær">
                <form className="kontaktskjema__innhold">
                    <AlertStripeInfo className="kontaktskjemaSykefravær__alertstripe typo-normal">
                        Arbeidet med å forebygge sykefravær og sikre godt
                        arbeidsmiljø, er et ansvar som deles mellom arbeidsgiver
                        og tillitsvalgte (eller ansattrepresentanter). NAV
                        Arbeidslivssenter kan bistå i dette arbeidet.
                    </AlertStripeInfo>
                    <AnsattrepresentantFelter
                        oppdaterBesvarelse={this.oppdaterBesvarelse}
                        besvarelse={this.state.besvarelse}
                    />
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
                        className="kontaktskjema__knapp"
                        onClick={this.sendInnOnClick}
                        data-testid="sendinn"
                    >
                        Send til NAV Arbeidslivssenter
                    </Hovedknapp>
                    <Veilederpanel svg={<img src={veilederBilde} alt={''} />}>
                        <Element>Vil du heller ringe?</Element>
                        <Normaltekst>
                            Du kan også ringe arbeidsgivertelefonen på{' '}
                            <a href={'tel:+4755553336'} className={'lenke'}>
                                55 55 33 36
                            </a>
                            .
                        </Normaltekst>
                    </Veilederpanel>
                </form>
            </div>
        );
    }
}

export default medFylkesinndeling(KontaktskjemaSykefravær);
