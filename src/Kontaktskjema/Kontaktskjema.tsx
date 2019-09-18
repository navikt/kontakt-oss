import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { useQueryState } from 'react-router-use-location-state';
import { Temavalg } from './Temavalg/Temavalg';
import { Tema, TemaType } from '../utils/kontaktskjemaApi';

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

type BesvarelseUtenFylkeOgKommune = Omit<Besvarelse, SkjemaFelt.kommune|SkjemaFelt.fylke>;

// TODO TAG-826 Fjern "nytt" i navnet
const NyttKontaktskjema: FunctionComponent<Fylkesinndeling> = props => {
    const [valgtTemaType, setTemaType] = useQueryState<TemaType | ''>(
        'tema',
        ''
    );
    const [valgtFylkenøkkel, setFylkenøkkel] = useQueryState<string>(
        'fylke',
        ''
    );
    const [valgtKommunenr, setKommunenr] = useQueryState<string>('kommune', '');

    const [tekstbesvarelse, setTekstbesvarelse] = useState<BesvarelseUtenFylkeOgKommune>(
        tomBesvarelse
    );

    const oppdaterFylkenøkkel = (fylkenøkkel: string) => {
        setFylkenøkkel(fylkenøkkel);
        setKommunenr('');
    };

    const fjernFeilmeldinger = () => {
        // TODO implementer
    };

    const oppdaterBesvarelse = (
        felt: SkjemaFelt,
        feltverdi: string | boolean
    ) => {
        setTekstbesvarelse({ ...tekstbesvarelse, [felt]: feltverdi });
        fjernFeilmeldinger(); // TODO Sjekk om dette funker. fjernFeilmeldinger pleide å være i callback til setState.
    };

    console.log('kontaktskjema render'); // TODO fjern

    const besvarelse: Besvarelse = {
        ...tekstbesvarelse,
        ...{
            kommune: getKommune(valgtKommunenr, props.fylkesinndeling),
            fylke: valgtFylkenøkkel,
        },
    };

    return (
        <div className="kontaktskjema">
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
                oppdaterFylkenøkkel={oppdaterFylkenøkkel}
                oppdaterKommunenr={setKommunenr}
                oppdaterBesvarelse={oppdaterBesvarelse}
                besvarelse={besvarelse}
            />
        </div>
    );
};

export default medFylkesinndeling(NyttKontaktskjema);
