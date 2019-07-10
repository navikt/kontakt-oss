import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { VEIVISER_URL } from '../../../../utils/konstanter';
import veiledereIllustrasjon from './veiledere.svg';
import './LenkepanelBekreftelse.less';

const LenkepanelBekreftelse = () => (
    <LenkepanelBase href={VEIVISER_URL} className="bekreftelse-lenkepanel">
        <img
            src={veiledereIllustrasjon}
            className="bekreftelse-lenkepanel__ikon"
            alt=""
        />
        <div className="bekreftelse-lenkepanel__innhold">
            <Undertittel className="bekreftelse-lenkepanel__tittel">
                Hva kan NAV tilby?
            </Undertittel>
            <Normaltekst>Les mer om mulighetene</Normaltekst>
        </div>
    </LenkepanelBase>
);

export default LenkepanelBekreftelse;
