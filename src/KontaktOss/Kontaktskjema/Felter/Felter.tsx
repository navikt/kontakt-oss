import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';
import { fylker, getAlfabetiserteKommuner } from '../../../utils/fylker';
import './Felter.less';
import {
    Fylkesinndeling,
    medFylkesinndeling,
} from '../../FylkesinndelingProvider';
import { useState } from 'react';
import { orgnrOk } from '../validering';

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
    const [visOrgnrFeilmelding, settVisOrgnrFeilmelding] = useState<boolean>(
        false
    );

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
                <Input
                    className="kontaktskjema-input__felt"
                    label={<Element>Bedriftens navn</Element>}
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.bedriftsnavn,
                            event.target.value
                        )
                    }
                    data-testid="bedriftsnavn"
                />
                <Input
                    className="kontaktskjema-input__felt"
                    label={<Element>Organisasjonsnummer (valgfritt)</Element>}
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.orgnr,
                            event.target.value
                        )
                    }
                    onBlur={() => {
                        settVisOrgnrFeilmelding(!orgnrOk(props.orgnr));
                    }}
                    feil={
                        visOrgnrFeilmelding
                            ? {
                                  feilmelding:
                                      'Vennligst oppgi et gyldig organisasjonsnummer',
                              }
                            : undefined
                    }
                    data-testid="orgnr"
                />
                <Input
                    className="kontaktskjema-input__felt"
                    label={<Element>Fornavn</Element>}
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.fornavn,
                            event.target.value
                        )
                    }
                    data-testid="fornavn"
                />
                <Input
                    className="kontaktskjema-input__felt"
                    label={<Element>Etternavn</Element>}
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.etternavn,
                            event.target.value
                        )
                    }
                    data-testid="etternavn"
                />
                <Input
                    className="kontaktskjema-input__felt"
                    label={<Element>E-post</Element>}
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.epost,
                            event.target.value
                        )
                    }
                    data-testid="epost"
                />
                <Input
                    className="kontaktskjema-input__felt"
                    label={<Element>Telefonnummer</Element>}
                    onChange={event =>
                        props.oppdaterBesvarelse(
                            SkjemaFelt.telefonnr,
                            event.target.value
                        )
                    }
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
