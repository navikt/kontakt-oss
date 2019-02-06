import * as React from 'react';
import advarselSvg from './advarsel.svg';

interface Props {
    className: string;
}

const Feilmelding: React.FunctionComponent<Props> = props => {
    return (
        <div
            aria-live="assertive"
            className={`alertstripe alertstripe--advarsel ${props.className}`}
        >
            <span aria-label="advarsel" className="alertstripe__ikon">
                <img src={advarselSvg} />
            </span>
            <span className="typo-normal alertstripe__tekst">
                {props.children}
            </span>
        </div>
    );
};

export default Feilmelding;
