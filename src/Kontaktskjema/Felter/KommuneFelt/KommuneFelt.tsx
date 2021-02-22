import React, { FunctionComponent, useContext, useState } from 'react';
import {
    KommunerContext,
    KommunerProps,
    medFylkesinndeling,
} from '../../../providers/KommunerProvider';
import { SkjemaFelt } from '../../utils/kontaktskjemaUtils';
import Typeahead, { Suggestion } from '../typeahead/Typeahead';

interface Props {
    label: string;
    felt: SkjemaFelt;
    feil?: React.ReactNode | boolean;
    oppdaterBesvarelse: (felt: SkjemaFelt, input: string) => void;
    valgtKommunenr: string;
}

const KommuneFelt: FunctionComponent<Props & KommunerProps> = (props) => {
    const kommuner = useContext(KommunerContext)
        .kommuner
        .map(
            ({navn, nummer}) => (
                {key: nummer, value: navn}
            )
        );
    const [visFeilmelding, setVisFeilmelding] = useState<boolean>(false);
    const [value, setValue] = useState<string>("")
    const [key, setKey] = useState<string | null>(null);

    const onSelect = (suggestion: Suggestion) => {
        props.oppdaterBesvarelse(props.felt, suggestion.key);
        setKey(suggestion.key);
        setValue(suggestion.value);
        setVisFeilmelding(false)
    };

    const onChange = (value: string) => {
        setValue(value);
        setKey(null);
        props.oppdaterBesvarelse(props.felt, "");
    };

    const onBlur = () => {
        if (key === null) {
            setValue("");
            props.oppdaterBesvarelse(props.felt, "");
            setVisFeilmelding(true);
        } else {
            const kommune = kommuner.find(kommune => kommune.key === key);
            if (kommune === undefined) {
                setKey(null);
                setValue("");
                props.oppdaterBesvarelse(props.felt, "");
                setVisFeilmelding(true);
            } else if (kommune.value !== value) {
                setValue(kommune.value);
                props.oppdaterBesvarelse(props.felt, key);
                setVisFeilmelding(false);
            }
        }
    };

    return (
            <Typeahead
                label={props.label}
                value={value}
                suggestions={
                    kommuner
                        .filter(kommune => kommune.value.toLowerCase().match(value.toLowerCase()))
                }
                onChange={onChange}
                onSelect={onSelect}
                onBlur={onBlur}
                placeholder={"Søk etter kommune"}
                id={props.felt}
                ariaLabel="Søk"
                feil={visFeilmelding && props.feil}
                data-testid="kommune"
            />
    );
};

export default medFylkesinndeling(KommuneFelt);
