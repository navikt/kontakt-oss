import * as React from 'react';
import { FunctionComponent } from 'react';
import { useQueryState } from 'react-router-use-location-state';
import { Temavalg } from './Temavalg/Temavalg';
import { getTema, Tema, TemaType } from '../utils/kontaktskjemaApi';

import './kontaktskjema.less';

// TODO TAG-826 Fjern "nytt" i navnet
const NyttKontaktskjema: FunctionComponent = () => {
    const [value, setValue] = useQueryState('fylke', '');
    const [kommune, setKommune] = useQueryState('kommune', '');

    const [valgtTemaType, setTemaType] = useQueryState<TemaType | ''>('tema', '');

    return (
        <div className="kontaktskjema">
            <Temavalg velgTema={(tema: Tema) => {setTemaType(tema.type)}} valgtTemaType={valgtTemaType}/>
        </div>
    );
};

export default NyttKontaktskjema;
