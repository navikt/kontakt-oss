import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './BildeMedTekst.less';

interface Props {
    svg: any;
    tekst: string;
}

export const BildeMedTekst: FunctionComponent<Props> = props => {
    return (
        <div className="bilde-med-tekst">
            <img src={props.svg} className="bilde-med-tekst__bilde"/>
            <Normaltekst>{props.tekst}</Normaltekst>
        </div>
    );
};
