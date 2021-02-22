import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useQueryState} from 'react-router-use-location-state';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Temavalg} from './Temavalg/Temavalg';
import {getTema, Tema, TemaType} from '../utils/kontaktskjemaApi';
import {ForebyggeSykefraværEkstradel} from './ForebyggeSykefraværEkstradel/ForebyggeSykefraværEkstradel';
import {KommunerContext, KommunerProps, medFylkesinndeling} from '../providers/KommunerProvider';
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

type BesvarelseUtenFylkeOgKommune = Omit<Besvarelse,
    SkjemaFelt.kommune | SkjemaFelt.fylkesenhetsnr>;

const Kontaktskjema: FunctionComponent<KommunerProps & RouteComponentProps> = (props) => {
    useEffect(() => {
        scrollToBanner();
        sendEvent('kontaktskjema', 'vist');
    }, []);

    const [valgtTemaType, setTemaType] = useQueryState<TemaType>('tema', TemaType.Rekruttering);

    const {kommuner} = useContext(KommunerContext);
    const [innsendingStatus, setInnsendingStatus] = useState<{
        feilmelding?: string;
        senderInn: boolean;
    }>({
        senderInn: false,
    });

    const [valgtFylkenøkkel, setFylkenøkkel] = useQueryState<string>('fylkesenhetsnr', '');
    const [valgtKommunenr, setKommunenr] = useQueryState<string>('kommune', '');

    const [tekstbesvarelse, setTekstbesvarelse] = useState<BesvarelseUtenFylkeOgKommune>(
        tomBesvarelse
    );
    const [visValideringsfeil, setVisValideringsfeil] = useState(false);
    const [valideringsfeil, setValideringsfeil] = useState<Partial<Record<SkjemaFelt, FeiloppsummeringFeil>>>({});
    const feilFor = (felt: SkjemaFelt) => {
        return visValideringsfeil && valideringsfeil[felt]?.feilmelding;
    }
    const feiloppsummeringRef = React.createRef<HTMLDivElement>();
    useEffect(() => {
        if (visValideringsfeil && feiloppsummeringRef.current) {
            feiloppsummeringRef.current.scrollIntoView({behavior: "smooth"});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visValideringsfeil]); // kun fokuser dersom visValideringsfeil endrer seg
    const fjernFeilmeldinger = () =>
        setInnsendingStatus({
            senderInn: false,
            feilmelding: '',
        });
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
        fjernFeilmeldinger();
    };

    const besvarelse: Besvarelse = {
        ...tekstbesvarelse,
        fylkesenhetsnr: valgtFylkenøkkel,
        kommune: {
            navn: "",
            nummer: valgtKommunenr
        }
    };
    const tema = getTema(valgtTemaType);

    const sendInn = async (event: any): Promise<void> => {
        event.preventDefault();

        if (innsendingStatus.senderInn) {
            return;
        } else {
            setInnsendingStatus({
                senderInn: true,
                feilmelding: '',
            });
        }

        const kommunenr = besvarelse.kommune.nummer;
        const besvarelseMedKommunenavn = {
            ...besvarelse,
            kommune: {
                nummer: kommunenr,
                navn: kommuner.find(k => k.nummer === kommunenr)?.navn ?? ''
            }
        }

        const validering = validerBesvarelse(besvarelseMedKommunenavn);
        setValideringsfeil(validering.feilmelding);
        if (!validering.ok) {
            setVisValideringsfeil(true);
            feiloppsummeringRef.current && feiloppsummeringRef.current.focus();
            return;
        }

        const sendInnResultat = await sendInnBesvarelse(besvarelseMedKommunenavn, tema);
        if (sendInnResultat.ok) {
            props.history.push(BEKREFTELSE_PATH + '?tema=' + tema.type);
        } else {
            setInnsendingStatus({
                feilmelding: sendInnResultat.feilmelding,
                senderInn: false,
            });
            return;
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
                    <div className="kontaktskjema__vanlig-tekst">
                        <Normaltekst>Alle felter må fylles ut.</Normaltekst>
                    </div>
                    <Temavalg
                        velgTema={(tema: Tema) => {
                            setTemaType(tema.type);
                            fjernFeilmeldinger();
                        }}
                        valgtTemaType={valgtTemaType}
                    />
                    {valgtTemaType === TemaType.ForebyggeSykefravær && (
                        <ForebyggeSykefraværEkstradel
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
                    {innsendingStatus.feilmelding && (
                        <AlertStripeAdvarsel className="kontaktskjema__feilmelding">
                            {innsendingStatus.feilmelding}
                        </AlertStripeAdvarsel>
                    )}
                    <Feiloppsummering
                        style={visValideringsfeil && Object.keys(valideringsfeil).length > 0 ? {} : {display: "none"}}
                        innerRef={feiloppsummeringRef}
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

export default medFylkesinndeling(Kontaktskjema);
