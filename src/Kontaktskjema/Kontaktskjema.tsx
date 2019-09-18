import * as React from 'react';
import { FunctionComponent } from 'react';
import { useQueryState } from 'react-router-use-location-state';
import { Temavalg } from './Temavalg/Temavalg';
import { Tema, TemaType } from '../utils/kontaktskjemaApi';

import './kontaktskjema.less';
import { ForebyggeSykefraværEkstradel } from './ForebyggeSykefraværEkstradel/ForebyggeSykefraværEkstradel';

// TODO TAG-826 Fjern "nytt" i navnet
const NyttKontaktskjema: FunctionComponent = () => {
    const [valgtTemaType, setTemaType] = useQueryState<TemaType | ''>('tema', '');

    return (
        <div className="kontaktskjema">
            <Temavalg velgTema={(tema: Tema) => {setTemaType(tema.type)}} valgtTemaType={valgtTemaType}/>
            {valgtTemaType === TemaType.ForebyggeSykefravær && <ForebyggeSykefraværEkstradel/>}
        </div>
    );
};

export default NyttKontaktskjema;
