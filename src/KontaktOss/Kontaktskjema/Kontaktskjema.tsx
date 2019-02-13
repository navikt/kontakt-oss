import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Inputfelter, { SkjemaId } from './Inputfelter/Inputfelter';
import LenkepanelBekreftelse from './LenkepanelKontaktliste/LenkepanelKontaktliste';
import Infoboks from './Infoboks/Infoboks';
import { besvarelseErGyldig, orgnrOk } from './validering';
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
    ugyldigOrgnr: boolean;
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
        ugyldigOrgnr: false,
    };

    avgiSvar = (id: SkjemaId, input: string) => {
        const nyBesvarelse: any = { ...this.state.besvarelse };
        nyBesvarelse[id.toString()] = input;
        this.setState({
            besvarelse: nyBesvarelse,
            besvarelseErGyldig: true,
            ugyldigOrgnr: false,
        });
    };

    sendInnBesvarelse = () => {
        logEvent('kontakt-oss.send-inn-klikk');
        const kommune = this.state.besvarelse.kommune;
        const orgnr = this.state.besvarelse.orgnr.replace(/ /g, '');
        const kontaktskjema: KontaktskjemaModell = {
            ...this.state.besvarelse,
            orgnr: orgnr,
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

        if (!orgnrOk(this.state.besvarelse.orgnr)) {
            this.setState({ ugyldigOrgnr: true });
        } else {
            this.setState({ ugyldigOrgnr: false });
        }
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
                {!this.state.besvarelseErGyldig && (
                    <Feilmelding className="kontaktskjema__feilmelding">
                        Alle feltene må være fylt ut før du sender inn.
                    </Feilmelding>
                )}
                {this.state.innsendingFeilet && (
                    <Feilmelding className="kontaktskjema__feilmelding">
                        Noe gikk feil med innsendingen. Vennligst prøv igjen
                        senere.
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
                        visOrgnrFeilmelding={this.state.ugyldigOrgnr}
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
