import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import Infoboks from '../Infoboks/Infoboks';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';

import './kontaktskjemaSykefravær.less';
import FellesFelter from '../FellesFelter/FellesFelter';
import { AnsattrepresentantFelter } from './AnsattrepresentantFelter/AnsattrepresentantFelter';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veilederBilde from '../../ArbeidsgiverTlfIInfo/kvinne.svg';
import { KontaktskjemaProps } from '../KontaktskjemaContainer';

const KontaktskjemaSykefravær: React.FunctionComponent<
    KontaktskjemaProps
> = props => {
    return (
        <div className="kontaktskjema kontaktskjemaSykefravær">
            <form className="kontaktskjema__innhold">
                <AlertStripeInfo className="kontaktskjemaSykefravær__alertstripe typo-normal">
                    Arbeidet med å forebygge sykefravær og sikre godt
                    arbeidsmiljø, er et ansvar som deles mellom arbeidsgiver og
                    tillitsvalgte (eller ansattrepresentanter). NAV
                    Arbeidslivssenter kan bistå i dette arbeidet.
                </AlertStripeInfo>
                <AnsattrepresentantFelter
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    besvarelse={props.besvarelse}
                />
                <FellesFelter
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    besvarelse={props.besvarelse}
                />
                <Infoboks>
                    <Normaltekst>
                        NAV bruker disse opplysningene når vi kontakter deg. Vi
                        lagrer disse opplysningene om deg, slik at vi kan
                        kontakte deg om forebygging av sykefravær i bedriften du
                        representerer. Opplysningene blir ikke delt eller brukt
                        til andre formål.
                    </Normaltekst>
                </Infoboks>
                {props.feilmelding && (
                    <AlertStripeAdvarsel
                        className="kontaktskjema__feilmelding"
                    >
                        {props.feilmelding}
                    </AlertStripeAdvarsel>
                )}
                <Hovedknapp
                    className="kontaktskjema__knapp"
                    onClick={props.sendInnOnClick}
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
};

export default KontaktskjemaSykefravær;
