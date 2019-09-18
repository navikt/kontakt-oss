import * as React from 'react';
import { FunctionComponent } from 'react';
import { useQueryState } from 'react-router-use-location-state';
import { Temavalg } from './Temavalg/Temavalg';
import { Tema, TemaType } from '../utils/kontaktskjemaApi';

import './kontaktskjema.less';
import { ForebyggeSykefraværEkstradel } from './ForebyggeSykefraværEkstradel/ForebyggeSykefraværEkstradel';
import FylkeFelt from './FylkeFelt/FylkeFelt';
import KommuneFelt from './KommuneFelt/KommuneFelt';

// TODO TAG-826 Fjern "nytt" i navnet
const NyttKontaktskjema: FunctionComponent = () => {
    const [valgtTemaType, setTemaType] = useQueryState<TemaType | ''>(
        'tema',
        ''
    );
    const [valgtFylkenøkkel, setFylkenøkkel] = useQueryState<string>(
        'fylke',
        ''
    );
    const [valgtKommunenr, setKommunenr] = useQueryState<string>('kommune', '');

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
            <FylkeFelt
                label="Hvilket fylke ligger arbeidsplassen i?"
                oppdaterBesvarelse={fylkenøkkel => {
                    setFylkenøkkel(fylkenøkkel);
                    setKommunenr('');
                }}
                valgtFylkenøkkel={valgtFylkenøkkel}
            />
            <KommuneFelt
                label="Hvilken kommune ligger arbeidsplassen i?"
                fylkeNokkel={valgtFylkenøkkel}
                oppdaterBesvarelse={setKommunenr}
                valgtKommunenr={valgtKommunenr}
            />
        </div>
    );
};

export default NyttKontaktskjema;
