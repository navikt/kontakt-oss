import * as React from 'react';

import { Besvarelse } from '../besvarelse';
import './Felter.less';
import FylkeFelt from './FylkeFelt/FylkeFelt';
import KommuneFelt from './KommuneFelt/KommuneFelt';
import Felt from './Felt/Felt';
import ValidertFelt from './ValidertFelt/ValidertFelt';
import { epostOk, orgnrOk, telefonnummerOk } from '../validering';

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
    besvarelse: Besvarelse;
}

const Felter: React.FunctionComponent<Props> = props => {
    const { fylke, orgnr, epost, telefonnr } = props.besvarelse;

    return (
        <div className="kontaktskjema-input">
            <div className="kontaktskjema-input__wrapper">
                <FylkeFelt
                    label={'Hvilket fylke ligger arbeidsplassen i?'}
                    felt={SkjemaFelt.fylke}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                />
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
            </div>
        </div>
    );
};

export default Felter;
