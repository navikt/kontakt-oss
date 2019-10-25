import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import checkmarkIkon from './checkmark.svg';
import './Bekreftelseboks.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

const Bekreftelseboks = () => (
    <div className="bekreftelseboks">
        <Veilederpanel
            svg={<img src={checkmarkIkon} alt="" />}
            type="plakat"
            kompakt={true}
            fargetema="suksess"
        >
            <Systemtittel className="bekreftelseboks__tittel">
                Din henvendelse er mottatt
            </Systemtittel>
            <Normaltekst>Vi vil kontakte deg så snart som mulig</Normaltekst>
        </Veilederpanel>
    </div>
);

export default Bekreftelseboks;
