import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import KontaktskjemaInputfelter from './kontaktskjemainputfelter/KontaktskjemaInputfelter';
import LenkepanelTilKontaktliste from './lenkepaneltilkontaktliste/LenkepanelTilKontaktliste';
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
import {
    KONTAKTSKJEMA_BEKREFTELSE_PATH,
    SAMLESIDE_PATH,
} from '../../utils/konstanter';
import './KontaktSkjema.less';

export interface KontaktskjemaInputProps {
    avgiSvar: (id: SkjemaId, input: string) => void;
}

export enum SkjemaId {
    kommune = 'kommune',
    bedriftsnavn = 'bedriftsnavn',
    bedriftsnr = 'bedriftsnr', // TODO Dette skal være orgnr. Må endres i backend og frontend.
    fornavn = 'fornavn',
    etternavn = 'etternavn',
    epost = 'epost',
    telefonnr = 'telefonnr',
    fylke = 'fylke',
}

export interface Besvarelse {
    kommune?: KommuneModell;
    bedriftsnavn?: string;
    bedriftsnr?: string;
    fornavn?: string;
    etternavn?: string;
    epost?: string;
    telefonnr?: string;
    fylke?: string;
}

interface State {
    besvarelse: Besvarelse;
    besvarelseErGyldig: boolean;
    innsendingFeilet: boolean;
}

type Props = RouteComponentProps &
    // TODO: Skal tema være optional?
    FeatureToggles & {
        tema?: Tema;
    };

class KontaktSkjema extends React.Component<Props, State> {
    state: State = {
        besvarelse: {},
        besvarelseErGyldig: true,
        innsendingFeilet: false,
    };

    avgiSvar = (id: SkjemaId, input: string): void => {
        // TODO: Fiks any
        const nyBesvarelse: any = { ...this.state.besvarelse };
        nyBesvarelse[id.toString()] = input;
        this.setState({
            besvarelse: nyBesvarelse,
            besvarelseErGyldig: true,
        });
    };

    sendInnBesvarelse = (): void => {
        logEvent(
            'veiviserarbeidsgiver.inkludering.kontaktskjema.send-inn-klikk'
        );
        const kommune = this.state.besvarelse.kommune;
        const kontaktskjema: KontaktskjemaModell = {
            ...this.state.besvarelse,
            kommune: kommune!.navn,
            kommunenr: kommune!.nummer,
            tema: this.props.tema,
        };

        sendKontaktskjema(kontaktskjema).then(
            () => {
                logEvent(
                    'veiviserarbeidsgiver.inkludering.kontaktskjema.success',
                    {
                        tema: mapTilTemaEvent(this.props.tema),
                    }
                );
                this.props.history.push(KONTAKTSKJEMA_BEKREFTELSE_PATH);
            },
            () => {
                logEvent('veiviserarbeidsgiver.inkludering.kontaktskjema.fail');
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
            pilotfylkeErValgt && this.props.kontaktskjemaForPilotfylker;
        const skalBareViseLenkeTilTlfListe = fylke && !skalViseHeleSkjemaet;

        const vilDuHellerRinge = skalViseHeleSkjemaet && (
            <LenkepanelTilKontaktliste
                href={hrefKontaktlisteMedQueryParam}
                tittel="Vil du heller ringe?"
                undertekst="Kontakt en av våre medarbeidere direkte."
            />
        );

        const kontaktVareMedarbeidere = skalBareViseLenkeTilTlfListe && (
            <LenkepanelTilKontaktliste
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
                <Link
                    to={SAMLESIDE_PATH}
                    className="kontaktskjema__avbryt-lenke lenke typo-normal"
                >
                    Avbryt
                </Link>
            </>
        );

        return (
            <div className="kontaktskjema">
                <form
                    className="kontaktskjema__innhold"
                    onSubmit={this.sendInnBesvarelse}
                >
                    <KontaktskjemaInputfelter
                        avgiSvar={this.avgiSvar}
                        fylkeNokkel={fylke}
                        visKunFylkesvalg={!skalViseHeleSkjemaet}
                    />
                    {skalViseHeleSkjemaet && skjemaInnsendingsInfo}
                    {vilDuHellerRinge}
                    {kontaktVareMedarbeidere}
                </form>
            </div>
        );
    }
}

export default medFeatureToggles(KontaktSkjema);
