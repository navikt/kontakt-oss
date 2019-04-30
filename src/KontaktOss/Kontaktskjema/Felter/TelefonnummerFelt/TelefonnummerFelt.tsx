import React, { ChangeEvent, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';

import { SkjemaFelt } from '../Felter';
import { telefonnummerOk } from '../../validering';

interface Props {
    label: string;
    felt: SkjemaFelt;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
    telefonnr: string;
}

const TelefonnummerFelt = (props: Props) => {
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    const feilmelding = visFeilmelding
        ? { feilmelding: 'Vennligst oppgi et gyldig telefonnummer' }
        : undefined;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.oppdaterBesvarelse(props.felt, event.target.value);
    };

    return (
        <Input
            className="felt"
            label={<Element>{props.label}</Element>}
            onChange={onChange}
            onBlur={() => {
                settVisFeilmelding(!telefonnummerOk(props.telefonnr));
            }}
            feil={feilmelding}
        />
    );
};

export default TelefonnummerFelt;
