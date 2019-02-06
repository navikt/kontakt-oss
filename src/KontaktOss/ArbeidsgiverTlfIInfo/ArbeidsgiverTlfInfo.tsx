import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Element } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import veilederBilde from './kvinne.svg';
import './ArbeidsgiverTlfInfo.less';

const ArbeidsgiverTlfInfo = () => {
    return (
        <div className="arbeidsgiver-tlf-info">
            <Veilederpanel
                type="plakat"
                svg={<img src={veilederBilde} />}
                kompakt={true}
            >
                <Element>Kontakt arbeidsgivertelefonen</Element>
                <Normaltekst className="arbeidsgiver-tlf-info__beskrivelse">
                    For denne typen henvendelser ber vi deg å ta kontakt med
                    arbeidsgivertelefonen på{' '}
                    <span className="arbeidsgiver-tlf-info__tlfnr">
                        55 55 33 36
                    </span>
                </Normaltekst>
            </Veilederpanel>
        </div>
    );
};

export default ArbeidsgiverTlfInfo;
