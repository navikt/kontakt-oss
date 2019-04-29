import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { getAlfabetiserteKommuner } from '../../../../utils/fylker';
import { SkjemaFelt } from '../Felter';
import { Select } from 'nav-frontend-skjema';
import {
    Fylkesinndeling,
    medFylkesinndeling,
} from '../../../FylkesinndelingProvider';
import '../Felt/Felt.less';

interface Props {
    label: string;
    felt: SkjemaFelt;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
    fylkeNokkel?: string;
}

const KommuneFelt: FunctionComponent<Props & Fylkesinndeling> = props => {
    const kommunerOptions = getAlfabetiserteKommuner(
        props.fylkesinndeling,
        props.fylkeNokkel
    ).map(kommune => (
        <option value={JSON.stringify(kommune)} key={kommune.nummer}>
            {kommune.navn}
        </option>
    ));

    const onChange = (event: any) => {
        props.oppdaterBesvarelse(props.felt, JSON.parse(event.target.value));
    };

    return (
        <Select
            label={<Element>{props.label}</Element>}
            className="felt"
            onChange={onChange}
        >
            <option value="" key="ingen valgt" />
            {kommunerOptions}
        </Select>
    );
};

export default medFylkesinndeling(KommuneFelt);
