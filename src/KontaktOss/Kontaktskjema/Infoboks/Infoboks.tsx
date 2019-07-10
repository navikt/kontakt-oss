import * as React from 'react';
import infoSirkel from './infoSirkel.svg';
import './Infoboks.less';

const Infoboks: React.FunctionComponent = props => (
    <div className="infoboks">
        <img src={infoSirkel} className="infoboks__ikon" aria-label="info" alt="" />
        {props.children}
    </div>
);

export default Infoboks;
