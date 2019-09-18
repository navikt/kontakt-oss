import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { useQueryState } from 'react-router-use-location-state';
import { Temavalg } from './Temavalg/Temavalg';
import { getTema, Tema, TemaType } from '../utils/kontaktskjemaApi';
import './kontaktskjema.less';
import { ForebyggeSykefraværEkstradel } from './ForebyggeSykefraværEkstradel/ForebyggeSykefraværEkstradel';
import { Felter } from './Felter/Felter';
import {
    Besvarelse,
    tomBesvarelse,
} from '../KontaktOss/Kontaktskjema/besvarelse';
import { getKommune } from '../utils/fylker';
import { SkjemaFelt } from '../KontaktOss/Kontaktskjema/FellesFelter/FellesFelter';
import {
    Fylkesinndeling,
    medFylkesinndeling,
} from '../KontaktOss/FylkesinndelingProvider';
import Infoboks from '../KontaktOss/Kontaktskjema/Infoboks/Infoboks';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { validerBesvarelseOgSendInn } from '../KontaktOss/Kontaktskjema/kontaktskjemaUtils';
import { BEKREFTELSE_PATH } from '../utils/paths';
import { RouteComponentProps } from 'react-router-dom';

type BesvarelseUtenFylkeOgKommune = Omit<
    Besvarelse,
    SkjemaFelt.kommune | SkjemaFelt.fylke
>;

// TODO TAG-826 Fjern "nytt" i navnet
const NyttKontaktskjema: FunctionComponent<
    Fylkesinndeling & RouteComponentProps
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
        setInnsendingStatus({
            senderInn: false,
            feilmelding: '',
        }); // TODO Sjekk om dette funker. fjernFeilmeldinger pleide å være i callback til setState.
    };

    console.log('kontaktskjema render'); // TODO fjern

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
        <div className="kontaktskjema">
            <div className="kontaktskjema__innhold">
                <Temavalg
                    velgTema={(tema: Tema) => {
                        setTemaType(tema.type);
                    }}
                    valgtTemaType={valgtTemaType}
                />
                {valgtTemaType === TemaType.ForebyggeSykefravær && (
                    <ForebyggeSykefraværEkstradel />
                )}
                <Felter
                    oppdaterBesvarelse={oppdaterBesvarelse}
                    besvarelse={besvarelse}
                />
                <Infoboks>
                    <Normaltekst>
                        NAV bruker disse opplysningene når vi kontakter deg. Vi
                        lagrer disse opplysningene om deg, slik at vi kan
                        kontakte deg om{' '}
                        {tema ? tema.tekst.toLowerCase() : 'ditt valgte tema'} i
                        bedriften du representerer. Opplysningene blir ikke delt
                        eller brukt til andre formål.
                    </Normaltekst>
                </Infoboks>
                {innsendingStatus.feilmelding && (
                    <AlertStripeAdvarsel className="kontaktskjema__feilmelding">
                        {innsendingStatus.feilmelding}
                    </AlertStripeAdvarsel>
                )}
                <Hovedknapp
                    onClick={sendInnOnClick}
                    data-testid="sendinn"
                    className={'kontaktskjema__knapp'}
                >
                    Send inn
                </Hovedknapp>
            </div>
        </div>
    );
};

export default medFylkesinndeling(NyttKontaktskjema);
