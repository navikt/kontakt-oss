import FylkeFelt from './FylkeFelt/FylkeFelt';
import KommuneFelt from './KommuneFelt/KommuneFelt';
import * as React from 'react';
import { FunctionComponent } from 'react';
import ValidertFelt from './ValidertFelt/ValidertFelt';
import { epostOk, inneholderKunVanligeTegn, orgnrOk, telefonnummerOk } from '../utils/validering';

import './Felter.less';
import { Besvarelse, SkjemaFelt } from '../utils/kontaktskjemaUtils';
import { TemaType } from '../../utils/kontaktskjemaApi';

interface Props {
    tema: TemaType;
    besvarelse: Besvarelse;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string | boolean) => void;
}

export const Felter: FunctionComponent<Props> = (props) => {
    const { orgnr, epost, telefonnr, bedriftsnavn, navn } = props.besvarelse;

    return (
        <>
            <div className="kontaktskjema-felter__bolk">
                <div className="kontaktskjema-felter__row kontaktskjema-felter__row__enkel">
                    { props.tema  === 'REKRUTTERING' ?
                        <KommuneFelt
                            label="Hvilken kommune ligger arbeidsplassen i?"
                            felt={SkjemaFelt.kommune}
                            oppdaterBesvarelse={props.oppdaterBesvarelse}
                            valgtKommunenr={props.besvarelse.kommune.nummer}
                        />
                        :
                        <FylkeFelt
                            label="Hvilket fylke ligger arbeidsplassen i?"
                            felt={SkjemaFelt.fylkesenhetsnr}
                            oppdaterBesvarelse={props.oppdaterBesvarelse}
                            valgtFylkenøkkel={props.besvarelse.fylkesenhetsnr}
                        />
                    }
                </div>

                <div className="kontaktskjema-felter__row kontaktskjema-felter__row__dobbel">
                    <ValidertFelt
                        label="Bedriftens navn"
                        felt={SkjemaFelt.bedriftsnavn}
                        oppdaterBesvarelse={props.oppdaterBesvarelse}
                        verdi={bedriftsnavn}
                        validering={inneholderKunVanligeTegn}
                        feilmelding={'Dette feltet kan ikke inneholde spesialtegn'}
                        data-testid="bedriftsnavn"
                        påkrevd={true}
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
            </div>

            <div className="kontaktskjema-felter__bolk">
                <div className="kontaktskjema-felter__row kontaktskjema-felter__row__enkel">
                    <ValidertFelt
                        label="Ditt navn"
                        felt={SkjemaFelt.navn}
                        oppdaterBesvarelse={props.oppdaterBesvarelse}
                        verdi={navn}
                        validering={inneholderKunVanligeTegn}
                        feilmelding={'Dette feltet kan ikke inneholde spesialtegn'}
                        data-testid="navn"
                        påkrevd={true}
                    />
                </div>
                <div className="kontaktskjema-felter__row kontaktskjema-felter__row__dobbel">
                    <ValidertFelt
                        label="E-post"
                        validering={epostOk}
                        feilmelding="Vennligst oppgi en gyldig e-post-adresse"
                        verdi={epost}
                        felt={SkjemaFelt.epost}
                        oppdaterBesvarelse={props.oppdaterBesvarelse}
                        data-testid="epost"
                        påkrevd={true}
                    />
                    <ValidertFelt
                        label="Telefonnummer"
                        felt={SkjemaFelt.telefonnr}
                        verdi={telefonnr}
                        feilmelding="Vennligst oppgi et gyldig telefonnummer"
                        validering={telefonnummerOk}
                        oppdaterBesvarelse={props.oppdaterBesvarelse}
                        data-testid="tlfnr"
                        påkrevd={true}
                    />
                </div>
            </div>
        </>
    );
};
