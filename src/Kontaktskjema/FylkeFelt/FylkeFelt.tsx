import { default as React, FunctionComponent } from 'react';
import { Select } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { fylker } from '../../utils/fylker';

interface Props {
    label: string;
    oppdaterBesvarelse: (input: string) => void;
    valgtFylkenøkkel: string;
}

const FylkeFelt: FunctionComponent<Props> = props => {
    const fylkerOptions = fylker.map((fylke, index) => (
        <option value={fylke.nokkel} key={index}>
            {fylke.navn}
        </option>
    ));

    return (
        <Select
            label={<Element>{props.label}</Element>}
            value={props.valgtFylkenøkkel}
            className="kontaktskjema-input__felt"
            onChange={event =>
                props.oppdaterBesvarelse(event.target.value)
            }
            data-testid="fylkerDropdown"
        >
            <option value="" key="ingen valgt" />
            {fylkerOptions}
        </Select>
    );
};

export default FylkeFelt;
