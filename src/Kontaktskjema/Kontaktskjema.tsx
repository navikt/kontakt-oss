import React, {FormEvent, FunctionComponent, MutableRefObject, useEffect, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useQueryState} from 'react-router-use-location-state';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Temavalg} from './Temavalg/Temavalg';
import {getTema, Tema, TemaType} from '../utils/kontaktskjemaApi';
import {ForebyggeSykefraværEkstradel} from './ForebyggeSykefraværEkstradel/ForebyggeSykefraværEkstradel';
// import {KommunerContext, KommunerProps} from '../providers/KommunerProvider';
import {Besvarelse, sendInnBesvarelse, SkjemaFelt, tomBesvarelse,} from './utils/kontaktskjemaUtils';
import {BEKREFTELSE_PATH} from '../utils/paths';
import {HvaSkjerVidere} from './HvaSkjerVidere/HvaSkjerVidere';
import {EnkelInfostripe} from './EnkelInfostripe/EnkelInfostripe';
import Banner from '../Banner/Banner';
import bannerIllustrasjon from './illustrasjon.svg';
import {scrollToBanner} from '../utils/scrollUtils';
import {sendEvent} from '../amplitude/amplitude';
import Brodsmulesti from '../Brodsmulesti/Brodsmulesti';
import './kontaktskjema.less';
import {Normaltekst} from 'nav-frontend-typografi';
import {Feiloppsummering, Input} from "nav-frontend-skjema";
import {FeiloppsummeringFeil} from "nav-frontend-skjema/src/feiloppsummering";
import KommuneFelt from "./Felter/KommuneFelt/KommuneFelt";
import FylkeFelt from "./Felter/FylkeFelt/FylkeFelt";
import {validerBesvarelse} from "./utils/validering";
import {GlobalFeilmelding} from "./GlobalFeilmelding";
import {useGlobalFeil} from "../hooks/useGlobalFeil";

type BesvarelseUtenFylkeOgKommune = Omit<Besvarelse,
    SkjemaFelt.kommune | SkjemaFelt.fylkesenhetsnr>;


const Kontaktskjema: FunctionComponent<RouteComponentProps> = (props) => {
    useEffect(() => {
        scrollToBanner();
        sendEvent('kontaktskjema', 'vist');
    }, []);

    const {rapporterFeil,fjernFeil} = useGlobalFeil();

    const [valgtTemaType, setTemaType] = useQueryState<TemaType>('tema', TemaType.Rekruttering);
    const [valgtFylkenøkkel, setFylkenøkkel] = useQueryState<string>('fylkesenhetsnr', '');
    const [valgtKommunenr, setKommunenr] = useQueryState<string>('kommune', '');

    const [innsendingStatus, setInnsendingStatus] = useState<{
        senderInn: boolean;
    }>({
        senderInn: false,
    });
    const [tekstbesvarelse, setTekstbesvarelse] = useState<BesvarelseUtenFylkeOgKommune>(
        tomBesvarelse
    );
    const [valideringsfeil, setValideringsfeil] = useState<Partial<Record<SkjemaFelt, FeiloppsummeringFeil>>>({});

    const feiloppsummeringRef = useRef<HTMLDivElement>();

    const tema = getTema(valgtTemaType);

    const focusFeiloppsummering = () => {
        if (feiloppsummeringRef.current) {
            feiloppsummeringRef.current.scrollIntoView({behavior: "smooth"});
        }
        setTimeout(() => {
            if (feiloppsummeringRef.current) {
                feiloppsummeringRef.current.focus();
            }
        }, 500);
    };

    const feilFor = (felt: SkjemaFelt) => {
        return valideringsfeil[felt]?.feilmelding;
    };

    const fjernFeilmeldinger = (felt?: SkjemaFelt) => {
        if (felt) {
            const { [felt] : fjernet, ...resterende } = valideringsfeil;
            setValideringsfeil(resterende);
        } else {
            setValideringsfeil({});
        }
        setInnsendingStatus({
            senderInn: false,
        });
    };

    const oppdaterBesvarelse = (felt: SkjemaFelt, feltverdi: string | boolean) => {
        switch (felt) {
            case SkjemaFelt.fylkesenhetsnr:
                setFylkenøkkel(feltverdi as string);
                setKommunenr('');
                break;
            case SkjemaFelt.kommune:
                setKommunenr(feltverdi as string);
                break;
            default:
                setTekstbesvarelse({...tekstbesvarelse, [felt]: feltverdi});
        }
        fjernFeilmeldinger(felt);
    };

    const sendInn = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (innsendingStatus.senderInn) {
            return;
        } else {
            setInnsendingStatus({
                senderInn: true,
            });
        }

        const validering = validerBesvarelse(besvarelse, tema);
        if (!validering.ok) {
            setValideringsfeil(validering.feilmelding);
            focusFeiloppsummering();
            return;
        }

        const sendInnResultat = await sendInnBesvarelse(besvarelse, tema);
        if (sendInnResultat.ok) {
            props.history.push(BEKREFTELSE_PATH + '?tema=' + tema.type);
        } else {
            if (sendInnResultat.feilmelding !== undefined) {
                rapporterFeil({
                    feilmelding: <>
                        Noe gikk feil med innsendingen. Du kan prøve igjen senere eller
                        <a href="https://arbeidsgiver.nav.no/kontakt-oss/fylkesvelger"> ring en markedskontakt direkte
                        </a>
                    </>,
                    error: new Error(sendInnResultat.feilmelding),
                })
            }
            setInnsendingStatus({
                senderInn: false,
            });
            return;
        }
    };

    const besvarelse: Besvarelse = {
        ...tekstbesvarelse,
        fylkesenhetsnr: valgtFylkenøkkel,
        kommune: {
            navn: "",
            nummer: valgtKommunenr
        }
    };

    return (
        <form onSubmit={sendInn}>
            <Brodsmulesti brodsmuler={[{url: '/kontaktskjema', title: 'Kontaktskjema', handleInApp: true}]}/>
            <Banner
                tekst="Kontaktskjema – arbeidsgiver"
                illustrasjon={bannerIllustrasjon}
                illustrasjonAltTekst=""
            />
            <div className="kontaktskjema">
                <div className="kontaktskjema__innhold">
                    <Temavalg
                        velgTema={(tema: Tema) => {
                            setTemaType(tema.type);
                            fjernFeilmeldinger();
                            fjernFeil();
                        }}
                        valgtTemaType={valgtTemaType}
                    />
                    {valgtTemaType === TemaType.ForebyggeSykefravær && (
                        <ForebyggeSykefraværEkstradel
                            feil={feilFor(SkjemaFelt.harSnakketMedAnsattrepresentant)}
                            oppdaterBesvarelse={oppdaterBesvarelse}
                            besvarelse={besvarelse}
                        />
                    )}

                    <div className="kontaktskjema-felter__bolk">
                        <div className="kontaktskjema-felter__row kontaktskjema-felter__row__enkel">
                            {valgtTemaType === 'REKRUTTERING' ?
                                <KommuneFelt
                                    label="Hvilken kommune ligger arbeidsplassen i?"
                                    felt={SkjemaFelt.kommune}
                                    feil={feilFor(SkjemaFelt.kommune)}
                                    oppdaterBesvarelse={oppdaterBesvarelse}
                                    valgtKommunenr={besvarelse.kommune.nummer}
                                />
                                :
                                <FylkeFelt
                                    label="Hvilket fylke ligger arbeidsplassen i?"
                                    felt={SkjemaFelt.fylkesenhetsnr}
                                    feil={feilFor(SkjemaFelt.fylkesenhetsnr)}
                                    oppdaterBesvarelse={oppdaterBesvarelse}
                                    valgtFylkenøkkel={besvarelse.fylkesenhetsnr}
                                />
                            }
                        </div>

                        <div className="kontaktskjema-felter__row kontaktskjema-felter__row__dobbel">
                            <Input
                                className="felt"
                                label="Bedriftens navn"
                                id={SkjemaFelt.bedriftsnavn}
                                onChange={({target: {value}}) => oppdaterBesvarelse(SkjemaFelt.bedriftsnavn, value)}
                                value={besvarelse.bedriftsnavn}
                                feil={feilFor(SkjemaFelt.bedriftsnavn)}
                                data-testid="bedriftsnavn"
                            />
                            <Input
                                className="felt"
                                label="Organisasjonsnummer (valgfritt)"
                                id={SkjemaFelt.orgnr}
                                onChange={({target: {value}}) => oppdaterBesvarelse(SkjemaFelt.orgnr, value)}
                                value={besvarelse.orgnr}
                                feil={feilFor(SkjemaFelt.orgnr)}
                                data-testid="orgnr"
                            />
                        </div>
                    </div>

                    <div className="kontaktskjema-felter__bolk">
                        <div className="kontaktskjema-felter__row kontaktskjema-felter__row__enkel">
                            <Input
                                className="felt"
                                label="Ditt navn"
                                id={SkjemaFelt.navn}
                                onChange={({target: {value}}) => oppdaterBesvarelse(SkjemaFelt.navn, value)}
                                value={besvarelse.navn}
                                feil={feilFor(SkjemaFelt.navn)}
                                data-testid="navn"
                            />
                        </div>
                        <div className="kontaktskjema-felter__row kontaktskjema-felter__row__dobbel">
                            <Input
                                className="felt"
                                label="E-post"
                                id={SkjemaFelt.epost}
                                onChange={({target: {value}}) => oppdaterBesvarelse(SkjemaFelt.epost, value)}
                                value={besvarelse.epost}
                                feil={feilFor(SkjemaFelt.epost)}
                                data-testid="epost"
                            />
                            <Input
                                className="felt"
                                label="Telefonnummer"
                                id={SkjemaFelt.telefonnr}
                                onChange={({target: {value}}) => oppdaterBesvarelse(SkjemaFelt.telefonnr, value)}
                                value={besvarelse.telefonnr}
                                feil={feilFor(SkjemaFelt.telefonnr)}
                                data-testid="tlfnr"
                            />
                        </div>
                    </div>

                    <EnkelInfostripe classname="kontaktskjema__infostripe">
                        NAV bruker disse opplysningene når vi kontakter deg. Vi lagrer disse
                        opplysningene om deg, slik at vi kan kontakte deg om{' '}
                        {tema ? tema.tekst.toLowerCase() : 'ditt valgte tema'} i bedriften du
                        representerer. Opplysningene blir ikke delt eller brukt til andre formål.
                    </EnkelInfostripe>
                    <GlobalFeilmelding />
                    <Feiloppsummering
                        // TODO: burde finne en måte å bruke useRef på, slik at scroll fungerer både første gang og
                        // senere den lastes. Styling er en hack.
                        style={Object.keys(valideringsfeil).length > 0 ? {} : {visibility: 'hidden', height: 0, margin: 0, padding: 0, border: 0}}
                        innerRef={feiloppsummeringRef as MutableRefObject<HTMLDivElement>}
                        tittel="For å gå videre må du rette opp følgende:"
                        feil={Object.values(valideringsfeil).sort().filter(e => e) as FeiloppsummeringFeil[]}
                    />
                    <Hovedknapp
                        htmlType="submit"
                        data-testid="sendinn"
                        className="kontaktskjema__knapp"
                    >
                        {valgtTemaType === TemaType.ForebyggeSykefravær
                            ? 'Send til NAV Arbeidslivssenter'
                            : 'Send inn'}
                    </Hovedknapp>
                    <HvaSkjerVidere tema={tema}/>
                </div>
            </div>
        </form>
    );
};

export default Kontaktskjema;
