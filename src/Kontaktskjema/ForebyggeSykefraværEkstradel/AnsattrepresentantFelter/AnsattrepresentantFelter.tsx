import * as React from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import { Besvarelse } from '../../../KontaktOss/Kontaktskjema/besvarelse';

import "./ansattrepresentantFelter.less";
import { SkjemaFelt } from '../../../KontaktOss/Kontaktskjema/FellesFelter/felter';

interface Props {
    besvarelse: Besvarelse;
    oppdaterBesvarelse: (id: SkjemaFelt, input: boolean) => void;
}

export const AnsattrepresentantFelter: React.FunctionComponent<
    Props
> = props => {
    const oppdaterBesvarelse = (svar: boolean) => {
        props.oppdaterBesvarelse(
            SkjemaFelt.harSnakketMedAnsattrepresentant,
            svar
        );
    };

    return (
        <fieldset className="ansattrepresentant">
            <legend className={"ansattrepresentant__label typo-element"}>
                Har du snakket med tillitsvalgt eller annen ansattrepresentant
                om forebygging av sykefravær?
            </legend>
            <div className="ansattrepresentant__felt-wrapper">
                <RadioPanel
                    onChange={() => oppdaterBesvarelse(true)}
                    name="ansattrepresentant"
                    label="Ja"
                    value="Ja"
                    checked={
                        props.besvarelse.harSnakketMedAnsattrepresentant ===
                        true
                    }
                />
                <RadioPanel
                    onChange={() => oppdaterBesvarelse(false)}
                    name="ansattrepresentant"
                    label="Nei"
                    value="Nei"
                    checked={
                        props.besvarelse.harSnakketMedAnsattrepresentant ===
                        false
                    }
                />
            </div>
        </fieldset>
    );
};
