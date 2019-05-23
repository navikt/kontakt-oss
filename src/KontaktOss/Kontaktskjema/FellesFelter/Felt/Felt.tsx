import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { SkjemaFelt } from '../FellesFelter';
import './Felt.less';

interface Props {
    label: string;
    felt: SkjemaFelt;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
    verdi: string;
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
        />
    );
};

export default Felt;
