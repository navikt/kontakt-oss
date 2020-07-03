import infosirkel from './info-sirkel-fyll.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './EnkelInfostripe.less';
import classNames from 'classnames';

interface Props {
    classname?: string;
}

export const EnkelInfostripe: FunctionComponent<Props> = (props) => (
    <div className={classNames('enkel-infostripe', props.classname)}>
        <div className="enkel-infostripe__ikon-wrapper">
            <img src={infosirkel} alt="informasjonsikon" />
        </div>
        <Normaltekst>{props.children}</Normaltekst>
    </div>
);
