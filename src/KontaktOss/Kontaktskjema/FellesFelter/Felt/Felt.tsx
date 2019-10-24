import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import './Felt.less';
import { SkjemaFelt } from '../felter';

interface Props {
    label: string;
    felt: SkjemaFelt;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
    verdi: string;
    'data-testid': string;
}

const Felt = (props: Props) => {
    const onChange = (event: any) => {
        props.oppdaterBesvarelse(props.felt, event.target.value);
    };

    return (
        <Input
            className="felt"
            label={<Element>{props.label}</Element>}
            onChange={onChange}
            value={props.verdi}
            data-testid={props['data-testid']}
        />
    );
};

export default Felt;
