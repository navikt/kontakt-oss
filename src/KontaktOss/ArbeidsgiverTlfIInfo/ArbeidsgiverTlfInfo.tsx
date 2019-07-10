import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import veilederBilde from './kvinne.svg';
import './ArbeidsgiverTlfInfo.less';

const ArbeidsgiverTlfInfo = () => {
    return (
        <div className="arbeidsgiver-tlf-info">
            <Veilederpanel
                type="plakat"
                svg={<img src={veilederBilde} alt="" />}
                kompakt={true}
            >
                <Normaltekst className="arbeidsgiver-tlf-info__beskrivelse">
                    For denne typen henvendelser ber vi deg å ta kontakt med
                    arbeidsgivertelefonen på{' '}
                    <a href={'tel:+4755553336'} className={'lenke'}>
                        55 55 33 36
                    </a>
                </Normaltekst>
            </Veilederpanel>
        </div>
    );
};

export default ArbeidsgiverTlfInfo;
