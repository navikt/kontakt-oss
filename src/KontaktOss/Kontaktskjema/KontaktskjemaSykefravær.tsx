import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Felter, { SkjemaFelt } from './Felter/Felter';
import LenkepanelKontaktliste from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import Feilmelding from './Feilmelding/Feilmelding';
import { Tema, } from '../../utils/kontaktskjemaApi';
import { FeatureToggles, medFeatureToggles } from '../FeatureTogglesProvider';
import './Kontaktskjema.less';
import { BEKREFTELSE_PATH } from '../../utils/paths';
import { Fylkesinndeling, medFylkesinndeling, } from '../FylkesinndelingProvider';
import { Besvarelse, tomBesvarelse } from './besvarelse';
import { validerBesvarelseOgSendInn } from './kontaktskjemaUtils';
import { Normaltekst } from 'nav-frontend-typografi';

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
                    <div>
                        Har du snakka med reppresentanta
                    </div>
                    <Felter
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
                        Send inn
                    </Hovedknapp>
                    {fylke && vilDuHellerRinge}
                </form>
            </div>
        );
    }
}

export default medFylkesinndeling(medFeatureToggles(KontaktskjemaSykefravær));
