import * as React from 'react';
import { FunctionComponent } from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import { useQueryState } from 'react-router-use-location-state';
import { Temavalg } from './Temavalg/Temavalg';
import { getTema, Tema } from '../utils/kontaktskjemaApi';

// TODO TAG.826 Fjern "nytt" i navnet
const NyttKontaktskjema: FunctionComponent = () => {
    const [value, setValue] = useQueryState('fylke', '');
    const [kommune, setKommune] = useQueryState('kommune', '');

    const [valgtTemaType, setTemaType] = useQueryState('tema', '');

    const valgtTema = getTema(valgtTemaType);

    return (
        <>
            <div> kontaktksjema for fylke: {value} </div>
            <RadioPanel
                checked={false}
                name="alternativ"
                onChange={() => {setValue("Innlandet")}}
                label="en knapp"
                value="en knapp"
            />
            <RadioPanel
                checked={false}
                name="alternativ"
                onChange={() => {setValue("Øst-Viken")}}
                label="en knapp"
                value="en knapp"
            />
            <RadioPanel
                checked={false}
                name="alternativ"
                onChange={() => {setKommune("Elverum")}}
                label="en knapp"
                value="en knapp"
            />
            <Temavalg velgTema={(tema: Tema) => {setTemaType(tema.type)}} valgtTema={getTema(valgtTemaType)}/>
        </>
    );
};

export default NyttKontaktskjema;
