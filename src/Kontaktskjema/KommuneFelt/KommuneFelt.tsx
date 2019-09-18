import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';
import { getAlfabetiserteKommuner } from '../../utils/fylker';
import { Fylkesinndeling, medFylkesinndeling } from '../../KontaktOss/FylkesinndelingProvider';

interface Props {
    label: string;
    oppdaterBesvarelse: (input: string) => void;
    fylkeNokkel?: string;
    valgtKommunenr: string;
}

const KommuneFelt: FunctionComponent<Props & Fylkesinndeling> = props => {
    const kommunerOptions = getAlfabetiserteKommuner(
        props.fylkesinndeling,
        props.fylkeNokkel
    ).map(kommune => (
        <option value={kommune.nummer} key={kommune.nummer}>
            {kommune.navn}
        </option>
    ));

    const onChange = (event: any) => {
        props.oppdaterBesvarelse(event.target.value);
    };

    return (
        <Select
            label={<Element>{props.label}</Element>}
            className="felt"
            onChange={onChange}
            disabled={kommunerOptions.length === 0}
            value={props.valgtKommunenr}
            data-testid="kommunerDropdown"
        >
            <option value="" key="ingen valgt" />
            {kommunerOptions}
        </Select>
    );
};

export default medFylkesinndeling(KommuneFelt);
