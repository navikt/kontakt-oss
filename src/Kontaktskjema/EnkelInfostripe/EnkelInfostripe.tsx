import infosirkel from '../Temavalg/info-sirkel-fyll.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './EnkelInfostripe.less';
import classNames from 'classnames';

interface Props {
    classname?: string;
}

export const EnkelInfostripe: FunctionComponent<Props> = props => (
    <div className={classNames('enkel-infostripe', props.classname)}>
        <img
            className="enkel-infostripe__ikon"
            src={infosirkel}
            alt="informasjonsikon"
        />
        <Normaltekst>{props.children}</Normaltekst>
    </div>
);