import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Infoboks from '../Infoboks/Infoboks';
import Feilmelding from '../Feilmelding/Feilmelding';
import { Tema } from '../../../utils/kontaktskjemaApi';
import {
    FeatureToggles,
    medFeatureToggles,
} from '../../FeatureTogglesProvider';
import { BEKREFTELSE_PATH } from '../../../utils/paths';
import {
    Fylkesinndeling,
    medFylkesinndeling,
} from '../../FylkesinndelingProvider';
import { Besvarelse, tomBesvarelse } from '../besvarelse';
import { validerBesvarelseOgSendInn } from '../kontaktskjemaUtils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

import './kontaktskjemaSykefravær.less';
import FellesFelter, { SkjemaFelt } from '../FellesFelter/FellesFelter';
import { AnsattrepresentantFelter } from './AnsattrepresentantFelter/AnsattrepresentantFelter';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veilederBilde from '../../ArbeidsgiverTlfIInfo/kvinne.svg';

interface State {
    besvarelse: Besvarelse;
    feilmelding?: string;
}

interface OwnProps {
    tema: Tema;
}

type Props = RouteComponentProps & FeatureToggles & Fylkesinndeling & OwnProps;

class KontaktskjemaSykefravær extends React.Component<Props, State> {
    state: State = {
        besvarelse: tomBesvarelse,
    };

    oppdaterBesvarelse = (felt: SkjemaFelt, feltverdi: string | boolean) => {
        this.setState(
            {
                besvarelse: { ...this.state.besvarelse, [felt]: feltverdi },
            },
            this.fjernFeilmeldinger
        );
    };

    fjernFeilmeldinger = () => {
        this.setState({
            feilmelding: undefined,
        });
    };

    sendInnOnClick = async (event: any): Promise<void> => {
        event.preventDefault();
        const sendInnResultat = await validerBesvarelseOgSendInn(
            this.state.besvarelse,
            this.props.tema
        );

        if (sendInnResultat.ok) {
            this.props.history.push(BEKREFTELSE_PATH);
        } else {
            this.setState({
                feilmelding: sendInnResultat.feilmelding,
            });
        }
    };

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

export default medFylkesinndeling(medFeatureToggles(KontaktskjemaSykefravær));
