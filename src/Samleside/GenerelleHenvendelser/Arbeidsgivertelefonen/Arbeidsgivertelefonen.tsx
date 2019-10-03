import * as React from 'react';
import { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

import telefonSvg from './telefon.svg';
import './Arbeidsgivertelefonen.less';

interface Props {
    className: string;
}


//TODO Større margin på moblk, mindre på desktop
export const Arbeidsgivertelefonen: FunctionComponent<Props> = props => {
    return (
        <div className={'arbeidsgivertelefonen ' + props.className}>
            <img src={telefonSvg} alt="" className="arbeidsgivertelefonen__ikon"/>
            <div className="arbeidsgivertelefonen__tekst-wrapper">
                <a
                    href={'tel:+4755553336'}
                    className="lenke typo-innholdstittel arbeidsgivertelefonen__tlf"
                >
                    55 55 33 36
                </a>
                <Normaltekst>Kl. 08.00–15.30 (hverdager)</Normaltekst>
            </div>
        </div>
    );
};
