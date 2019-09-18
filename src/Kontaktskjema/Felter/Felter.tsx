import FylkeFelt from '../FylkeFelt/FylkeFelt';
import KommuneFelt from '../KommuneFelt/KommuneFelt';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Besvarelse } from '../../KontaktOss/Kontaktskjema/besvarelse';
import ValidertFelt from '../../KontaktOss/Kontaktskjema/FellesFelter/ValidertFelt/ValidertFelt';
import {
    epostOk,
    inneholderKunVanligeTegn,
    orgnrOk,
    telefonnummerOk,
} from '../../KontaktOss/Kontaktskjema/validering';
import { Undertittel } from 'nav-frontend-typografi';
import { SkjemaFelt } from '../../KontaktOss/Kontaktskjema/FellesFelter/FellesFelter';

interface Props {
    oppdaterFylkenøkkel: (fylkenøkkel: string) => void;
    oppdaterKommunenr: (kommunenr: string) => void;
    besvarelse: Besvarelse;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string | boolean) => void;
}

export const Felter: FunctionComponent<Props> = props => {
    const {
        orgnr,
        epost,
        telefonnr,
        bedriftsnavn,
        fornavn,
        etternavn,
    } = props.besvarelse;

    return (
        <div className="kontaktskjema-input">
            <div className="kontaktskjema-input__wrapper">
                <FylkeFelt
                    label="Hvilket fylke ligger arbeidsplassen i?"
                    oppdaterBesvarelse={props.oppdaterFylkenøkkel}
                    valgtFylkenøkkel={props.besvarelse.fylke}
                />
                <KommuneFelt
                    label="Hvilken kommune ligger arbeidsplassen i?"
                    fylkeNokkel={props.besvarelse.fylke}
                    oppdaterBesvarelse={props.oppdaterKommunenr}
                    valgtKommunenr={props.besvarelse.kommune.nummer}
                />
                <ValidertFelt
                    label="Bedriftens navn"
                    felt={SkjemaFelt.bedriftsnavn}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    verdi={bedriftsnavn}
                    validering={inneholderKunVanligeTegn}
                    feilmelding={'Dette feltet kan ikke inneholde spesialtegn'}
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
            </div>
            <Undertittel className={'blokk-s'}>
                Dine kontaktopplysninger
            </Undertittel>
            <div className="kontaktskjema-input__wrapper">
                <ValidertFelt
                    label="Fornavn"
                    felt={SkjemaFelt.fornavn}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    verdi={fornavn}
                    validering={inneholderKunVanligeTegn}
                    feilmelding={'Dette feltet kan ikke inneholde spesialtegn'}
                    data-testid="fornavn"
                />
                <ValidertFelt
                    label="Etternavn"
                    felt={SkjemaFelt.etternavn}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    verdi={etternavn}
                    validering={inneholderKunVanligeTegn}
                    feilmelding={'Dette feltet kan ikke inneholde spesialtegn'}
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
