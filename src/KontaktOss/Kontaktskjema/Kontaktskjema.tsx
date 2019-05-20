import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Felter, { SkjemaFelt } from './Felter/Felter';
import LenkepanelKontaktliste from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import {
    besvarelseErGyldig,
    felterErGyldige,
    paakrevdeFelterErUtfylte,
} from './validering';
import Feilmelding from './Feilmelding/Feilmelding';
import {
    sendKontaktskjema,
    Tema,
    TemaType,
} from '../../utils/kontaktskjemaApi';
import { logFail, logSendInnKlikk, logSuccess } from '../../utils/metricsUtils';
import { erPilotfylke } from '../../utils/fylker';
import { FeatureToggles, medFeatureToggles } from '../FeatureTogglesProvider';
import './Kontaktskjema.less';
import { BEKREFTELSE_PATH } from '../../utils/paths';
import { VEIVISER_URL } from '../../utils/konstanter';
import {
    Fylkesinndeling,
    medFylkesinndeling,
} from '../FylkesinndelingProvider';
import { Besvarelse, tomBesvarelse } from './besvarelse';
import { sendInnBesvarelse } from './kontaktskjemaUtils';

interface State {
    besvarelse: Besvarelse;
    feilmelding?: string;
}

interface OwnProps {
    tema: Tema;
}

type Props = RouteComponentProps & FeatureToggles & Fylkesinndeling & OwnProps;

class Kontaktskjema extends React.Component<Props, State> {
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
        const sendInnResultat = await sendInnBesvarelse(this.state.besvarelse, this.props.tema);

        if (sendInnResultat.ok) {
            this.props.history.push(BEKREFTELSE_PATH);
        } else {
            this.setState({
                feilmelding: sendInnResultat.feilmelding
            });
        }
    };

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
                    <Felter
                        oppdaterBesvarelse={this.oppdaterBesvarelse}
                        besvarelse={this.state.besvarelse}
                    />
                    <Infoboks>
                        <div className="typo-normal">
                            NAV bruker disse opplysningene når vi kontakter deg.
                            Vi lagrer disse opplysningene om deg, slik at vi kan
                            kontakte deg om rekruttering og inkludering i
                            bedriften du representerer. Opplysningene blir ikke
                            delt eller brukt til andre formål.
                        </div>
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
                        Send inn
                    </Hovedknapp>
                    {fylke && vilDuHellerRinge}
                </form>
            </div>
        );
    }
}

export default medFylkesinndeling(medFeatureToggles(Kontaktskjema));
