import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Inputfelter, { SkjemaFelt } from './Inputfelter/Inputfelter';
import LenkepanelKontaktliste from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import { besvarelseErGyldig, paakrevdeFelterErUtfylte, orgnrOk } from './validering';
import Feilmelding from './Feilmelding/Feilmelding';
import {
    sendKontaktskjema,
    Tema,
} from '../../utils/kontaktskjemaApi';
import { logFail, logSendInnKlikk, logSuccess } from '../../utils/metricsUtils';
import {
    erPilotfylke,
} from '../../utils/fylker';
import { FeatureToggles, medFeatureToggles } from '../FeatureTogglesProvider';
import './Kontaktskjema.less';
import { BEKREFTELSE_PATH } from '../../utils/paths';
import { VEIVISER_URL } from '../../utils/konstanter';
import { Fylkesinndeling, medFylkesinndeling } from '../FylkesinndelingProvider';
import { Besvarelse, tomBesvarelse } from './besvarelse';

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
        besvarelse: tomBesvarelse
    };

    oppdaterBesvarelse = (felt: SkjemaFelt, feltverdi: string) => {
        this.setState({
            besvarelse: { ...this.state.besvarelse, [felt]: feltverdi },
        }, this.fjernFeilmeldinger);
    };

    fjernFeilmeldinger = () => {
        this.setState({
            feilmelding: undefined
        })
    };

    sendInnBesvarelse = async () => {
        logSendInnKlikk();

        try {
            await sendKontaktskjema(this.state.besvarelse, this.props.tema);
            logSuccess(this.props.tema);
            this.props.history.push(BEKREFTELSE_PATH);
        } catch (error) {
            logFail();
            this.setState({ feilmelding: 'Noe gikk feil med innsendingen. Vennligst prøv igjen senere.' });
        }
    };

    sendInnOnClick = (event: any): void => {
        event.preventDefault();
        if (besvarelseErGyldig(this.state.besvarelse)) {
            this.sendInnBesvarelse();
        } else {
            this.settFeilmelding();
        }
    };

    settFeilmelding = () => {
        if (!paakrevdeFelterErUtfylte(this.state.besvarelse)) {
            this.setState({feilmelding: 'Du må fylle ut alle feltene for å sende inn.'});
        }
        if (!orgnrOk(this.state.besvarelse.orgnr)) {
            this.setState({feilmelding: 'Ett eller flere av feltene er ikke fylt ut riktig.'});
        }
    };

    render() {
        const fylke = this.state.besvarelse.fylke;

        const fylkesinndelingHentetOK = !!this.props.fylkesinndeling;

        const skalViseHeleSkjemaet =
            erPilotfylke(fylke)
            && this.props.pilotfylkerFeature
            && fylkesinndelingHentetOK;


        const vilDuHellerRinge = skalViseHeleSkjemaet && (
            <LenkepanelKontaktliste
                tittel="Vil du heller ringe?"
                undertekst="Kontakt en av våre medarbeidere direkte."
                sendMetrikk={true}
                fylke={fylke}
            />
        );

        const skalBareViseLenkeTilTlfListe = fylke && !skalViseHeleSkjemaet;
        const kontaktVareMedarbeidere = skalBareViseLenkeTilTlfListe && (
            <LenkepanelKontaktliste
                tittel="Ring en av våre medarbeidere"
                undertekst="Vi kan hjelpe deg med arbeidstrening og rekruttering med eller uten tilrettelegging"
                fylke={fylke}
            />
        );

        return (
            <div className="kontaktskjema">
                <form className="kontaktskjema__innhold">
                    <Inputfelter
                        oppdaterBesvarelse={this.oppdaterBesvarelse}
                        fylkeNokkel={fylke}
                        visKunFylkesvalg={!skalViseHeleSkjemaet}
                        orgnr={this.state.besvarelse.orgnr}
                    />
                    {skalViseHeleSkjemaet && (
                        <>
                            <Infoboks>
                                <div className="typo-normal">
                                    NAV bruker disse opplysninger når vi kontakter deg.
                                    Opplysningene blir ikke delt eller brukt til andre
                                    formål. Vi sletter opplysningene etter at vi har
                                    kontaktet deg.
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
                            >
                                Send inn
                            </Hovedknapp>
                            <a
                                href={VEIVISER_URL}
                                className="kontaktskjema__avbryt-lenke lenke typo-normal"
                            >
                                Avbryt
                            </a>
                        </>
                    )}
                    {vilDuHellerRinge}
                    {kontaktVareMedarbeidere}
                </form>
            </div>
        );
    }
}

export default medFylkesinndeling(medFeatureToggles(Kontaktskjema));
