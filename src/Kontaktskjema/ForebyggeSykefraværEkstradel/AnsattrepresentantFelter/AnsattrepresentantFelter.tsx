import * as React from 'react';
import {RadioPanelGruppe} from 'nav-frontend-skjema';

import './ansattrepresentantFelter.less';
import {Besvarelse, SkjemaFelt} from '../../utils/kontaktskjemaUtils';


interface Props {
    besvarelse: Besvarelse;
    oppdaterBesvarelse: (id: SkjemaFelt, input: boolean) => void;
    feil?: React.ReactNode | boolean;
}

export const AnsattrepresentantFelter: React.FunctionComponent<Props> = (props) => {
    const oppdaterBesvarelse = (svar: boolean) => {
        props.oppdaterBesvarelse(SkjemaFelt.harSnakketMedAnsattrepresentant, svar);
    };

    let checked;
    if (props.besvarelse.harSnakketMedAnsattrepresentant !== undefined) {
        checked = props.besvarelse.harSnakketMedAnsattrepresentant ? "Ja" : "Nei";
    }
    return (
        <div id={SkjemaFelt.harSnakketMedAnsattrepresentant} className="ansattrepresentant">
            <RadioPanelGruppe
                name="ansattrepresentant"
                legend="Har du snakket med tillitsvalgt eller annen ansattrepresentant om forebygging av sykefravær?"
                radios={[
                    {label: "Ja", value: "Ja", id: "Ja" },
                    {label: "Nei", value: "Nei", id: "Nei"},
                ]}
                checked={checked}
                feil={props.feil}
                onChange={(_, verdi) => oppdaterBesvarelse(verdi === "Ja")}
            />
        </div>
    );
};
