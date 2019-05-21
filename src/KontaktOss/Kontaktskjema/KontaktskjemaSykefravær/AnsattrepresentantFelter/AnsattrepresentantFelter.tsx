import * as React from 'react';
import { Input, RadioPanel } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { SkjemaFelt } from '../../FellesFelter/FellesFelter';
import { Besvarelse } from '../../besvarelse';

interface Props {
    besvarelse: Besvarelse;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
}

export const AnsattrepresentantFelter: React.FunctionComponent<
    Props
> = props => {
    const onChange = (event: any) => {
        props.oppdaterBesvarelse(
            SkjemaFelt.harSnakketMedAnsattrepresentant,
            event.target.value
        );
    };

    return (
        <>
        <Element>
            Har du snakket med tillitsvalgt eller annen ansattrepresentant om
            forebygging av sykefravær?
        </Element>
            <RadioPanel
                onChange={() => {}}
                inputProps={{ className: 'blokk-xs' }}
                name={'alternativ'}
                label="Ja"
                value="Ja"
                checked={true}
            />
        </>
    );
};
