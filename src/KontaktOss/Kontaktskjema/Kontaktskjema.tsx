import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Inputfelter, { SkjemaId } from './Inputfelter/Inputfelter';
import LenkepanelBekreftelse from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import { besvarelseErGyldig } from './validering';
import Feilmelding from './Feilmelding/Feilmelding';
import {
    KontaktskjemaModell,
    sendKontaktskjema,
    Tema,
} from '../../utils/kontaktskjemaApi';
import { logEvent, mapTilTemaEvent } from '../../utils/metricsUtils';
import {
    getHrefTilKontaktliste,
    KommuneModell,
    pilotfylkerForKontaktskjema,
} from '../../utils/fylker';
import { FeatureToggles, medFeatureToggles } from '../FeatureTogglesProvider';
import './Kontaktskjema.less';
import { BEKREFTELSE_PATH } from '../../utils/paths';
import { VEIVISER_URL } from '../../utils/konstanter';
import { fjernWhitespace } from '../../utils/stringUtils';
import { validerOrgnr } from '../../utils/orgnrUtils';

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

type Props = RouteComponentProps &
    FeatureToggles & {
        tema: Tema;
    };

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

    avgiSvar = (id: SkjemaId, input: string) => {
        const nyBesvarelse: any = { ...this.state.besvarelse };
        nyBesvarelse[id.toString()] = input;
        this.setState({
            besvarelse: nyBesvarelse,
            besvarelseErGyldig: true,
            gyldigOrgnr: true,
        });
    };

    sendInnBesvarelse = () => {
        logEvent('kontakt-oss.send-inn-klikk');
        const kommune = this.state.besvarelse.kommune;
        const kontaktskjema: KontaktskjemaModell = {
            ...this.state.besvarelse,
            orgnr: fjernWhitespace(this.state.besvarelse.orgnr),
            kommune: kommune!.navn,
            kommunenr: kommune!.nummer,
            tema: this.props.tema,
        };

        sendKontaktskjema(kontaktskjema).then(
            () => {
                logEvent('kontakt-oss.success', {
                    tema: mapTilTemaEvent(this.props.tema),
                });
                this.props.history.push(BEKREFTELSE_PATH);
            },
            () => {
                logEvent('kontakt-oss.fail');
                this.setState({
                    innsendingFeilet: true,
                });
            }
        );
    };

    sendInnOnClick = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (besvarelseErGyldig(this.state.besvarelse)) {
            this.sendInnBesvarelse();
        } else {
            this.setState({ besvarelseErGyldig: false });
        }

        if (!validerOrgnr(this.state.besvarelse.orgnr)) {
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
        const hrefKontaktliste = getHrefTilKontaktliste(fylke);
        const hrefKontaktlisteMedQueryParam =
            hrefKontaktliste + '?fraKontaktskjema=true';

        const pilotfylkeErValgt = pilotfylkerForKontaktskjema.some(
            pilot => pilot === fylke
        );

        const skalViseHeleSkjemaet =
            pilotfylkeErValgt && this.props.pilotfylkerFeature;
        const skalBareViseLenkeTilTlfListe = fylke && !skalViseHeleSkjemaet;

        const vilDuHellerRinge = skalViseHeleSkjemaet && (
            <LenkepanelBekreftelse
                href={hrefKontaktlisteMedQueryParam}
                tittel="Vil du heller ringe?"
                undertekst="Kontakt en av våre medarbeidere direkte."
            />
        );

        const kontaktVareMedarbeidere = skalBareViseLenkeTilTlfListe && (
            <LenkepanelBekreftelse
                href={hrefKontaktlisteMedQueryParam}
                tittel="Ring en av våre medarbeidere"
                undertekst="Vi kan hjelpe deg med arbeidstrening og rekruttering med eller uten tilrettelegging"
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
                        avgiSvar={this.avgiSvar}
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

export default medFeatureToggles(Kontaktskjema);
