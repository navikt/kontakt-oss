import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Select } from 'nav-frontend-skjema';
import { fylker, getAlfabetiserteKommuner } from '../../../utils/fylker';
import './Felter.less';
import {
    Fylkesinndeling,
    medFylkesinndeling,
} from '../../FylkesinndelingProvider';
import Felt from './Felt/Felt';
import OrgnrFelt from './OrgnrFelt/OrgnrFelt';

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

interface OwnProps {
    oppdaterBesvarelse: (id: SkjemaFelt, input: string) => void;
    fylkeNokkel?: string;
    visKunFylkesvalg: boolean;
    orgnr: string; // TODO Bytt ut med controlled inputfelter
}

type Props = OwnProps & Fylkesinndeling;

const Felter: React.FunctionComponent<Props> = props => {
    const fylkerOptions = fylker.map((fylke, index) => (
        <option value={fylke.nokkel} key={index}>
            {fylke.navn}
        </option>
    ));

    const ovrigeFelter = () => {
        const kommunerOptions = getAlfabetiserteKommuner(
            props.fylkesinndeling,
            props.fylkeNokkel
        ).map(kommune => (
            <option value={JSON.stringify(kommune)} key={kommune.nummer}>
                {kommune.navn}
            </option>
        ));

        return (
            <>
                <Select
                    label={
                        <Element>
                            Hvilken kommune ligger arbeidsplassen i?
                        </Element>
                    }
                    className="kontaktskjema-input__felt"
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.kommune,
                            JSON.parse(event.target.value)
                        )
                    }
                    data-testid="kommunerDropdown"
                >
                    <option value="" key="ingen valgt" />
                    {kommunerOptions}
                </Select>
                <Felt
                    label="Bedriftens navn"
                    felt={SkjemaFelt.bedriftsnavn}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    data-testid="bedriftsnavn"
                />
                <OrgnrFelt
                    label="Organisasjonsnummer (valgfritt)"
                    felt={SkjemaFelt.orgnr}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    orgnr={props.orgnr}
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
                <Felt
                    label="E-post"
                    felt={SkjemaFelt.epost}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    data-testid="epost"
                />
                <Felt
                    label="Telefonnummer"
                    felt={SkjemaFelt.telefonnr}
                    oppdaterBesvarelse={props.oppdaterBesvarelse}
                    data-testid="tlfnr"
                />
            </>
        );
    };

    const ovrigeInputfelter = !props.visKunFylkesvalg && ovrigeFelter();

    return (
        <div className="kontaktskjema-input">
            <div className="kontaktskjema-input__wrapper">
                <Select
                    label={
                        <Element>
                            Hvilket fylke ligger arbeidsplassen i?
                        </Element>
                    }
                    className="kontaktskjema-input__felt"
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.fylke,
                            event.target.value
                        )
                    }
                    data-testid="fylkerDropdown"
                >
                    <option value="" key="ingen valgt" />
                    {fylkerOptions}
                </Select>
                {ovrigeInputfelter}
            </div>
        </div>
    );
};

export default medFylkesinndeling(Felter);
