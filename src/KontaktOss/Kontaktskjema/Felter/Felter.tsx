import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Checkbox, Select } from 'nav-frontend-skjema';

import { Besvarelse } from '../besvarelse';
import { fylker } from '../../../utils/fylker';
import OvrigeFelter from './OvrigeFelter/OvrigeFelter';
import './Felter.less';

export enum SkjemaFelt {
    kommune = 'kommune',
    bedriftsnavn = 'bedriftsnavn',
    orgnr = 'orgnr',
    fornavn = 'fornavn',
    etternavn = 'etternavn',
    epost = 'epost',
    telefonnr = 'telefonnr',
    fylke = 'fylke',
}

interface Props {
    oppdaterBesvarelse: (id: SkjemaFelt, input: string | boolean) => void;
    visKunFylkesvalg: boolean;
    visFeltForAnsattrepresentant: boolean;
    besvarelse: Besvarelse;
}

const Felter: React.FunctionComponent<Props> = props => {
    const fylkerOptions = fylker.map((fylke, index) => (
        <option value={fylke.nokkel} key={index}>
            {fylke.navn}
        </option>
    ));

    return (
        <div className="kontaktskjema-input">
            <div className="kontaktskjema-input__wrapper">
                <Select
                    label={
                        <Element>
                            Hvilket fylke ligger arbeidsplassen i?
                        </Element>
                    }
                    className="kontaktskjema-input__felt"
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.fylke,
                            event.target.value
                        )
                    }
                    data-testid="fylkerDropdown"
                >
                    <option value="" key="ingen valgt" />
                    {fylkerOptions}
                </Select>
                {!props.visKunFylkesvalg && (
                    <OvrigeFelter
                        besvarelse={props.besvarelse}
                        oppdaterBesvarelse={props.oppdaterBesvarelse}
                    />
                )}
            </div>
        </div>
    );
};

export default Felter;
