import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { SkjemaFelt } from '../Felter';
import { orgnrOk } from '../../validering';
import '../Felt/Felt.less';

interface Props {
    label: string;
    felt: SkjemaFelt;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
    orgnr: string;
}

const OrgnrFelt = (props: Props) => {
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    const feilmelding = visFeilmelding
        ? { feilmelding: 'Vennligst oppgi et gyldig organisasjonsnummer' }
        : undefined;

    const onChange = (event: any) => {
        props.oppdaterBesvarelse(props.felt, event.target.value);
    };

    return (
        <Input
            className="felt"
            label={<Element>{props.label}</Element>}
            onChange={onChange}
            onBlur={() => {
                settVisFeilmelding(!orgnrOk(props.orgnr));
            }}
            feil={feilmelding}
            {...props}
        />
    );
};

export default OrgnrFelt;
