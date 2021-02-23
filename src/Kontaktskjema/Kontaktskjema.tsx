import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQueryState } from 'react-router-use-location-state';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Temavalg } from './Temavalg/Temavalg';
import { getTema, Tema, TemaType } from '../utils/kontaktskjemaApi';
import { ForebyggeSykefraværEkstradel } from './ForebyggeSykefraværEkstradel/ForebyggeSykefraværEkstradel';
import { Felter } from './Felter/Felter';
import { KommunerContext, KommunerProps, medFylkesinndeling } from '../providers/KommunerProvider';
import { Besvarelse, SkjemaFelt, tomBesvarelse, validerBesvarelseOgSendInn, } from './utils/kontaktskjemaUtils';
import { BEKREFTELSE_PATH } from '../utils/paths';
import { HvaSkjerVidere } from './HvaSkjerVidere/HvaSkjerVidere';
import { EnkelInfostripe } from './EnkelInfostripe/EnkelInfostripe';
import Banner from '../Banner/Banner';
import bannerIllustrasjon from './illustrasjon.svg';
import { scrollToBanner } from '../utils/scrollUtils';
import { sendEvent } from '../amplitude/amplitude';
import Brodsmulesti from '../Brodsmulesti/Brodsmulesti';
import './kontaktskjema.less';
import { Normaltekst } from 'nav-frontend-typografi';

type BesvarelseUtenFylkeOgKommune = Omit<
    Besvarelse,
    SkjemaFelt.kommune | SkjemaFelt.fylkesenhetsnr
>;

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
                setTekstbesvarelse({ ...tekstbesvarelse, [felt]: feltverdi });
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

    const sendInnOnClick = async (event: any): Promise<void> => {
        event.preventDefault();

        if (innsendingStatus.senderInn) {
            return;
        } else {
            setInnsendingStatus({
                senderInn: true,
                feilmelding: '',
            });
        }

        if (!tema) {
            setInnsendingStatus({
                senderInn: false,
                feilmelding: 'Du må fylle ut alle feltene for å sende inn.',
            });
            return;
        }

        const kommunenr = besvarelse.kommune.nummer;
        const besvarelseMedKommunenavn = {
            ...besvarelse,
            kommune: {
                nummer: kommunenr,
                navn: kommuner.find(k => k.nummer === kommunenr)?.navn ?? ''
            }
        }

        const sendInnResultat = await validerBesvarelseOgSendInn(besvarelseMedKommunenavn, tema);

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
        <>
            <Brodsmulesti brodsmuler={[{url: '/kontaktskjema', title: 'Kontaktskjema', handleInApp: true}]} />
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
                    <Felter oppdaterBesvarelse={oppdaterBesvarelse} besvarelse={besvarelse} tema={valgtTemaType}/>
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
                    <Hovedknapp
                        onClick={sendInnOnClick}
                        data-testid="sendinn"
                        className="kontaktskjema__knapp"
                    >
                        {valgtTemaType === TemaType.ForebyggeSykefravær
                            ? 'Send til NAV Arbeidslivssenter'
                            : 'Send inn'}
                    </Hovedknapp>
                    <HvaSkjerVidere tema={tema} />
                </div>
            </div>
        </>
    );
};

export default medFylkesinndeling(Kontaktskjema);
