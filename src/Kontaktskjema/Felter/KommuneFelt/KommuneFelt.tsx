import React, {FunctionComponent, useEffect, useState} from 'react';
import {SkjemaFelt} from '../../utils/kontaktskjemaUtils';
import Typeahead, {Suggestion} from '../typeahead/Typeahead';
import {useGlobalFeil} from "../../../hooks/useGlobalFeil";
import {KOMMUNER_PATH} from "../../../utils/paths";
import {Kommune} from "../../../utils/fylker";

type Kommuner = Kommune[];

interface Props {
    label: string;
    felt: SkjemaFelt;
    feil?: React.ReactNode | boolean;
    oppdaterBesvarelse: (felt: SkjemaFelt, input: string) => void;
    valgtKommunenr: string;
}

const KommuneFelt: FunctionComponent<Props> = (props) => {
    const [kommuner, setKommuner] = useState<Kommuner>([]);
    const {rapporterFeil} = useGlobalFeil();
    useEffect(() => {
        const fetchError = (error: Error) => {
            rapporterFeil({
                feilmelding: <>
                    Vi klarte ikke hente kommuner. Du kan prøve igjen senere eller
                    <a href="https://arbeidsgiver.nav.no/kontakt-oss/fylkesvelger"> ring en markedskontakt
                        direkte</a>
                </>,
                error,
            })
        }
        fetch(KOMMUNER_PATH)
            .then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    fetchError(new Error(response.statusText));
                }
            })
            .then((response) => response?.json() as Promise<Kommuner> || [])
            .then(kommuner =>
                kommuner.sort((kommuneA, kommuneB) =>
                    kommuneA.navn.localeCompare(kommuneB.navn, 'nb-NO')
                ))
            .then((kommuner) => {
                const valgtKommune = kommuner.find(({nummer}) => nummer === props.valgtKommunenr);
                if (valgtKommune) {
                    setKey(valgtKommune.nummer);
                    setValue(valgtKommune.navn);
                }
                setKommuner(kommuner);
            }).catch(fetchError);
    }, [rapporterFeil, props.valgtKommunenr]);

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
            const kommune = kommuner.find(kommune => kommune.nummer === key);
            if (kommune === undefined) {
                setKey(null);
                setValue("");
                props.oppdaterBesvarelse(props.felt, "");
                setVisFeilmelding(true);
            } else if (kommune.navn !== value) {
                setValue(kommune.navn);
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
                    .map(({navn, nummer}) => ({key: nummer, value: navn}))
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

export default KommuneFelt;
