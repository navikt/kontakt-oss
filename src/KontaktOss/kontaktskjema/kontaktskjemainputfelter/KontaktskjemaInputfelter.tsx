import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';
import { KontaktskjemaInputProps, SkjemaId } from '../KontaktSkjema';
import { fylker, getAlfabetiserteKommuner } from '../../../utils/fylker';
import './kontaktskjemainputfelter.less';

interface OwnProps {
    fylkeNokkel?: string;
    visKunFylkesvalg: boolean;
}

type Props = OwnProps & KontaktskjemaInputProps;

const KontaktskjemaInputfelter: React.FunctionComponent<Props> = props => {
    const kommunerOptions = getAlfabetiserteKommuner(props.fylkeNokkel).map(
        kommune => (
            <option value={JSON.stringify(kommune)} key={kommune.nummer}>
                {kommune.navn}
            </option>
        )
    );

    const fylkerOptions = fylker.map(fylke => (
        <option value={fylke.nokkel} key={fylke.nokkel}>
            {fylke.navn}
        </option>
    ));

    const ovrigeInputfelter = (
        <>
            <Select
                label={
                    <Element>Hvilken kommune ligger arbeidsplassen i?</Element>
                }
                className="kontaktskjema-input__felt"
                onChange={event =>
                    props.avgiSvar(
                        SkjemaId.kommune,
                        JSON.parse(event.target.value)
                    )
                }
            >
                <option value="" key="ingen valgt" />
                {kommunerOptions}
            </Select>
            <Input
                className="kontaktskjema-input__felt"
                label={<Element>Bedriftens navn</Element>}
                onChange={event =>
                    props.avgiSvar(SkjemaId.bedriftsnavn, event.target.value)
                }
            />
            <Input
                className="kontaktskjema-input__felt"
                label={<Element>Organisasjonsnummer (valgfritt)</Element>}
                onChange={event =>
                    props.avgiSvar(SkjemaId.bedriftsnr, event.target.value)
                }
            />
            <Input
                className="kontaktskjema-input__felt"
                label={<Element>Fornavn</Element>}
                onChange={event =>
                    props.avgiSvar(SkjemaId.fornavn, event.target.value)
                }
            />
            <Input
                className="kontaktskjema-input__felt"
                label={<Element>Etternavn</Element>}
                onChange={event =>
                    props.avgiSvar(SkjemaId.etternavn, event.target.value)
                }
            />
            <Input
                className="kontaktskjema-input__felt"
                label={<Element>E-post</Element>}
                onChange={event =>
                    props.avgiSvar(SkjemaId.epost, event.target.value)
                }
            />
            <Input
                className="kontaktskjema-input__felt"
                label={<Element>Telefonnummer</Element>}
                onChange={event =>
                    props.avgiSvar(SkjemaId.telefonnr, event.target.value)
                }
            />
        </>
    );

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
                        props.avgiSvar(SkjemaId.fylke, event.target.value)
                    }
                >
                    <option value="" key="ingen valgt" />
                    {fylkerOptions}
                </Select>
                {!props.visKunFylkesvalg && ovrigeInputfelter}
            </div>
        </div>
    );
};

export default KontaktskjemaInputfelter;
