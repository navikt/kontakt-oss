import * as React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import './Infoboks.less';

const Infoboks: React.FunctionComponent = props => (
    <div className="infoboks">
        <span className="infoboks__ikon" aria-label="info">
            <Ikon kind="info-sirkel" size="1.5em" />
        </span>
        {props.children}
    </div>
);

export default Infoboks;
