import React, { FunctionComponent } from 'react';
import { Besvarelse } from '../../besvarelse';
import KommuneFelt from '../KommuneFelt/KommuneFelt';
import Felt from '../Felt/Felt';
import ValidertFelt from '../ValidertFelt/ValidertFelt';
import { SkjemaFelt } from '../Felter';
import { orgnrOk, epostOk, telefonnummerOk } from '../../validering';

interface Props {
    besvarelse: Besvarelse;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
}

const OvrigeFelter: FunctionComponent<Props> = props => {
    const { fylke, orgnr, epost, telefonnr } = props.besvarelse;

    return (
        <>
            <KommuneFelt
                label="Hvilken kommune ligger arbeidsplassen i?"
                felt={SkjemaFelt.kommune}
                fylkeNokkel={fylke}
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                data-testid="kommunerDropdown"
            />
            <Felt
                label="Bedriftens navn"
                felt={SkjemaFelt.bedriftsnavn}
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                data-testid="bedriftsnavn"
            />
            <ValidertFelt
                label="Organisasjonsnummer (valgfritt)"
                felt={SkjemaFelt.orgnr}
                feilmelding="Vennligst oppgi et gyldig organisasjonsnummer"
                validering={orgnrOk}
                verdi={orgnr}
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                data-testid="orgnr"
            />
            <Felt
                label="Fornavn"
                felt={SkjemaFelt.fornavn}
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                data-testid="fornavn"
            />
            <Felt
                label="Etternavn"
                felt={SkjemaFelt.etternavn}
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                data-testid="etternavn"
            />
            <ValidertFelt
                label="E-post"
                validering={epostOk}
                feilmelding="Vennligst oppgi en gyldig e-post-adresse"
                verdi={epost}
                felt={SkjemaFelt.epost}
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                data-testid="epost"
            />
            <ValidertFelt
                label="Telefonnummer"
                felt={SkjemaFelt.telefonnr}
                verdi={telefonnr}
                feilmelding="Vennligst oppgi et gyldig telefonnummer"
                validering={telefonnummerOk}
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                data-testid="tlfnr"
            />
        </>
    );
};

export default OvrigeFelter;
