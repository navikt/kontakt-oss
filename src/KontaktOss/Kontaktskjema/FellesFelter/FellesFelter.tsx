import * as React from 'react';
import { useContext } from 'react';
import { Besvarelse } from '../besvarelse';
import FylkeFelt from './FylkeFelt/FylkeFelt';
import KommuneFelt from './KommuneFelt/KommuneFelt';
import ValidertFelt from './ValidertFelt/ValidertFelt';
import {
    epostOk,
    inneholderKunVanligeTegn,
    orgnrOk,
    telefonnummerOk,
} from '../validering';

import './FellesFelter.less';
import { Undertittel } from 'nav-frontend-typografi';
import {
    FeatureToggle,
    FeatureToggles,
    FeatureTogglesContext,
} from '../../FeatureTogglesProvider';

export enum SkjemaFelt {
    kommune = 'kommune',
    bedriftsnavn = 'bedriftsnavn',
    orgnr = 'orgnr',
    fornavn = 'fornavn',
    etternavn = 'etternavn',
    epost = 'epost',
    telefonnr = 'telefonnr',
    fylke = 'fylke',
    harSnakketMedAnsattrepresentant = 'harSnakketMedAnsattrepresentant',
}

interface Props {
    oppdaterBesvarelse: (id: SkjemaFelt, input: string | boolean) => void;
    besvarelse: Besvarelse;
}

const FellesFelter: React.FunctionComponent<Props> = props => {
    const featureToggles = useContext<FeatureToggles>(FeatureTogglesContext);

    const {
        fylke,
        orgnr,
        epost,
        telefonnr,
        kommune,
        bedriftsnavn,
        fornavn,
        etternavn,
    } = props.besvarelse;

    const orgnrLabel = featureToggles[FeatureToggle.OrgnrObligatorisk]
        ? 'Organisasjonsnummer'
        : 'Organisasjonsnummer (valgfritt)';

    return (
        <div className="kontaktskjema-input">
            <div className="kontaktskjema-input__wrapper">
                <FylkeFelt
                    label="Hvilket fylke ligger arbeidsplassen i?"
                    felt={SkjemaFelt.fylke}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    verdi={fylke}
                />
                <KommuneFelt
                    label="Hvilken kommune ligger arbeidsplassen i?"
                    felt={SkjemaFelt.kommune}
                    fylkeNokkel={fylke}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    verdi={kommune}
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
                    label={orgnrLabel}
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

export default FellesFelter;
