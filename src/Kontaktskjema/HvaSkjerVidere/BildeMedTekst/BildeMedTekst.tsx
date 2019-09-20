import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './BildeMedTekst.less';

interface Props {
    svg: any;
    tekst: string;
}
// TODO Skal det være tom alt-tekst?
export const BildeMedTekst: FunctionComponent<Props> = props => {
    return (
        <div className="bilde-med-tekst">
            <img src={props.svg} className="bilde-med-tekst__bilde" alt=""/>
            <Normaltekst>{props.tekst}</Normaltekst>
        </div>
    );
};
