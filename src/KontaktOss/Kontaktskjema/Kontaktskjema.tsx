import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Inputfelter, { SkjemaFelt } from './Inputfelter/Inputfelter';
import LenkepanelKontaktliste from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import { besvarelseErGyldig, orgnrOk } from './validering';
import Feilmelding from './Feilmelding/Feilmelding';
import {
    BesvarelseBackend,
    sendKontaktskjema,
    Tema,
} from '../../utils/kontaktskjemaApi';
import { logFail, logSendInnKlikk, logSuccess } from '../../utils/metricsUtils';
import {
    erPilotfylke,
    KommuneModell,
} from '../../utils/fylker';
import { FeatureToggles, medFeatureToggles } from '../FeatureTogglesProvider';
import './Kontaktskjema.less';
import { BEKREFTELSE_PATH } from '../../utils/paths';
import { VEIVISER_URL } from '../../utils/konstanter';
import { fjernWhitespace } from '../../utils/stringUtils';
import { Fylkesinndeling, medFylkesinndeling } from '../FylkesinndelingProvider';

export interface Besvarelse {
    kommune: KommuneModell;
    bedriftsnavn: string;
    orgnr: string;
    fornavn: string;
    etternavn: string;
    epost: string;
    telefonnr: string;
    fylke: string;
}

interface State {
    besvarelse: Besvarelse;
    besvarelseErGyldig: boolean;
    innsendingFeilet: boolean;
    gyldigOrgnr: boolean;
}

interface OwnProps {
    tema: Tema;
}

type Props = RouteComponentProps & FeatureToggles & Fylkesinndeling & OwnProps;

class Kontaktskjema extends React.Component<Props, State> {
    state: State = {
        besvarelse: {
            fylke: '',
            kommune: { navn: '', nummer: '' },
            bedriftsnavn: '',
            orgnr: '',
            fornavn: '',
            etternavn: '',
            epost: '',
            telefonnr: '',
        },
        besvarelseErGyldig: true,
        innsendingFeilet: false,
        gyldigOrgnr: true,
    };

    oppdaterBesvarelse = (felt: SkjemaFelt, feltverdi: string) => {
        this.setState({
            besvarelse: { ...this.state.besvarelse, [felt]: feltverdi },
        }, this.fjernFeilmeldinger);
    };

    fjernFeilmeldinger() {
        this.setState({
            besvarelseErGyldig: true,
            gyldigOrgnr: true,
        })
    }

    sendInnBesvarelse = async () => {
        logSendInnKlikk();

        try {
            await sendKontaktskjema(this.state.besvarelse, this.props.tema);
            logSuccess(this.props.tema);
            this.props.history.push(BEKREFTELSE_PATH);
        } catch (error) {
            logFail();
            this.setState({ innsendingFeilet: true, });
        }

        /*
        sendKontaktskjema(this.state.besvarelse, this.props.tema).then(
            () => {
                logSuccess(this.props.tema);
                this.props.history.push(BEKREFTELSE_PATH);
            },
            () => {
                logFail();
                this.setState({ innsendingFeilet: true, });
            }
        );
        */
    };

    sendInnOnClick = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (besvarelseErGyldig(this.state.besvarelse)) {
            this.sendInnBesvarelse();
        } else {
            this.setState({ besvarelseErGyldig: false });
        }

        if (!orgnrOk(this.state.besvarelse.orgnr)) {
            this.setState({ gyldigOrgnr: false });
        } else {
            this.setState({ gyldigOrgnr: true });
        }
    };

    lagFeilmelding = () => {
        let feilmeldingTekst = undefined;
        if (!this.state.besvarelseErGyldig) {
            feilmeldingTekst = 'Du må fylle ut alle feltene for å sende inn.';
            if (!this.state.gyldigOrgnr) {
                feilmeldingTekst =
                    'Ett eller flere av feltene er ikke fylt ut riktig.';
            }
        } else if (this.state.innsendingFeilet) {
            feilmeldingTekst =
                'Noe gikk feil med innsendingen. Vennligst prøv igjen senere.';
        }
        return feilmeldingTekst;
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

        const feilmeldingTekst = this.lagFeilmelding();

        const skjemaInnsendingsInfo = (
            <>
                <Infoboks>
                    <div className="typo-normal">
                        NAV bruker disse opplysninger når vi kontakter deg.
                        Opplysningene blir ikke delt eller brukt til andre
                        formål. Vi sletter opplysningene etter at vi har
                        kontaktet deg.
                    </div>
                </Infoboks>
                {feilmeldingTekst && (
                    <Feilmelding className="kontaktskjema__feilmelding">
                        {feilmeldingTekst}
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
        );

        return (
            <div className="kontaktskjema">
                <form
                    className="kontaktskjema__innhold"
                    onSubmit={this.sendInnBesvarelse}
                >
                    <Inputfelter
                        oppdaterBesvarelse={this.oppdaterBesvarelse}
                        fylkeNokkel={fylke}
                        visKunFylkesvalg={!skalViseHeleSkjemaet}
                        visOrgnrFeilmelding={!this.state.gyldigOrgnr}
                    />
                    {skalViseHeleSkjemaet && skjemaInnsendingsInfo}
                    {vilDuHellerRinge}
                    {kontaktVareMedarbeidere}
                </form>
            </div>
        );
    }
}

export default medFylkesinndeling(medFeatureToggles(Kontaktskjema));
