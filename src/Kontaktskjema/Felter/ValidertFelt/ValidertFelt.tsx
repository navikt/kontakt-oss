import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import './ValidertFelt.less';
import { SkjemaFelt } from '../../utils/kontaktskjemaUtils';

interface Props {
    label: string;
    felt: SkjemaFelt;
    feilmelding: string;
    validering: (input: string) => boolean;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
    verdi: string;
    'data-testid': string;
    påkrevd?: boolean; // default: false
}

const ValidertFelt = (props: Props) => {
    const [visFeilmelding, settVisFeilmelding] = useState<'nei' | 'validering' | 'blank'>('nei');

    const feilmelding =
        visFeilmelding === 'validering' ?
            props.feilmelding :
            visFeilmelding === 'blank' ?
                'Du må fylle inn feltet.' :
                undefined;

    const onChange = (event: any) => {
        props.oppdaterBesvarelse(props.felt, event.target.value);
    };

    return (
        <Input
            className="felt"
            label={<Element>{props.label}</Element>}
            onChange={onChange}
            onBlur={() => {
                if (props.påkrevd && props.verdi.trim().length === 0) {
                    settVisFeilmelding('blank');
                } else {
                    settVisFeilmelding(!props.validering(props.verdi) ? 'validering' : 'nei');
                }
            }}
            value={props.verdi}
            feil={feilmelding}
            data-testid={props['data-testid']}
        />
    );
};

export default ValidertFelt;
