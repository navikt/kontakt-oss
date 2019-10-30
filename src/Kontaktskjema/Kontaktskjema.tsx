import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { useQueryState } from 'react-router-use-location-state';
import { Temavalg } from './Temavalg/Temavalg';
import { getTema, Tema, TemaType } from '../utils/kontaktskjemaApi';
import './kontaktskjema.less';
import { ForebyggeSykefraværEkstradel } from './ForebyggeSykefraværEkstradel/ForebyggeSykefraværEkstradel';
import { Felter } from './Felter/Felter';
import { getKommune } from '../utils/fylker';
import {
    FylkesinndelingProps,
    medFylkesinndeling,
} from '../providers/FylkesinndelingProvider';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    Besvarelse,
    SkjemaFelt,
    tomBesvarelse,
    validerBesvarelseOgSendInn,
} from './utils/kontaktskjemaUtils';
import { BEKREFTELSE_PATH } from '../utils/paths';
import { RouteComponentProps } from 'react-router-dom';
import { HvaSkjerVidere } from './HvaSkjerVidere/HvaSkjerVidere';
import { EnkelInfostripe } from './EnkelInfostripe/EnkelInfostripe';
import Banner from '../Banner/Banner';
import bannerIllustrasjon from './illustrasjon.svg';

type BesvarelseUtenFylkeOgKommune = Omit<
    Besvarelse,
    SkjemaFelt.kommune | SkjemaFelt.fylke
>;

const Kontaktskjema: FunctionComponent<
    FylkesinndelingProps & RouteComponentProps
> = props => {
    const [valgtTemaType, setTemaType] = useQueryState<TemaType | ''>(
        'tema',
        ''
    );

    const [innsendingStatus, setInnsendingStatus] = useState<{
        feilmelding?: string;
        senderInn: boolean;
    }>({
        senderInn: false,
    });

    const [valgtFylkenøkkel, setFylkenøkkel] = useQueryState<string>(
        'fylke',
        ''
    );
    const [valgtKommunenr, setKommunenr] = useQueryState<string>('kommune', '');

    const [tekstbesvarelse, setTekstbesvarelse] = useState<
        BesvarelseUtenFylkeOgKommune
    >(tomBesvarelse);

    const fjernFeilmeldinger = () =>
        setInnsendingStatus({
            senderInn: false,
            feilmelding: '',
        });

    const oppdaterBesvarelse = (
        felt: SkjemaFelt,
        feltverdi: string | boolean
    ) => {
        switch (felt) {
            case SkjemaFelt.fylke:
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
        ...{
            kommune: getKommune(valgtKommunenr, props.fylkesinndeling),
            fylke: valgtFylkenøkkel,
        },
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

        const sendInnResultat = await validerBesvarelseOgSendInn(
            besvarelse,
            tema
        );

        if (sendInnResultat.ok) {
            props.history.push(BEKREFTELSE_PATH);
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
                        }}
                        valgtTemaType={valgtTemaType}
                    />
                    {valgtTemaType === TemaType.ForebyggeSykefravær && (
                        <ForebyggeSykefraværEkstradel
                            oppdaterBesvarelse={oppdaterBesvarelse}
                            besvarelse={besvarelse}
                        />
                    )}
                    <Felter
                        oppdaterBesvarelse={oppdaterBesvarelse}
                        besvarelse={besvarelse}
                    />
                    <EnkelInfostripe classname="kontaktskjema__infostripe">
                        NAV bruker disse opplysningene når vi kontakter deg. Vi
                        lagrer disse opplysningene om deg, slik at vi kan
                        kontakte deg om{' '}
                        {tema ? tema.tekst.toLowerCase() : 'ditt valgte tema'} i
                        bedriften du representerer. Opplysningene blir ikke delt
                        eller brukt til andre formål.
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
