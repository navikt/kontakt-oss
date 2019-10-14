import * as React from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import Veilederpanel from 'nav-frontend-veilederpanel';
import konvolutt from './konvolutt.svg';
import './Bekreftelseboks.less';
import { Innholdstittel } from 'nav-frontend-typografi';

const Bekreftelseboks = () => (
    <div className="bekreftelseboks">
        <Veilederpanel
            svg={<img src={konvolutt} alt="" />}
            type="plakat"
            kompakt={true}
            fargetema="suksess"
        >
            <Innholdstittel className="bekreftelseboks__tittel">
                Takk for henvendelsen
            </Innholdstittel>
            <Normaltekst className="bekreftelseboks__normaltekst">
                Vi vil kontakte deg så snart som mulig</Normaltekst>
            <a href="https://www.nav.no/no/Bedrift" className="lenke bekreftelseboks__lenke"> 
                Gå til forside bedrift
            </a>
        </Veilederpanel>
    </div>
);

export default Bekreftelseboks;
