import * as React from 'react';
import { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import telefonSvg from './telefon.svg';
import './Arbeidsgivertelefonen.less';

interface Props {
    className: string;
}

export const Arbeidsgivertelefonen: FunctionComponent<Props> = props => {
    return (
        <div className={'arbeidsgivertelefonen ' + props.className}>
            <img src={telefonSvg} alt="telefon" />
            <div className="arbeidsgivertelefonen__tekst-wrapper">
                <Element>Arbeidsgivertelefonen</Element>
                <a
                    href={'tel:+4755553336'}
                    className="lenke typo-innholdstittel"
                >
                    55 55 33 36
                </a>
                <Normaltekst>Kl. 08:00 - 15:00 (hverdager)</Normaltekst>
            </div>
        </div>
    );
};
