import * as React from 'react';
import Bekreftelseboks from './Bekreftelseboks/Bekreftelseboks';
import './Bekreftelse.less';
import { scrollToBanner } from '../utils/scrollUtils';
import Banner from '../Banner/Banner';
import { HvaSkjerVidere } from '../Kontaktskjema/HvaSkjerVidere/HvaSkjerVidere';

class Bekreftelse extends React.Component {
    componentDidMount() {
        scrollToBanner();
    }

    render() {
        return (
            <>
                <Banner tekst="Kontaktskjema – arbeidsgiver" />
                <div
                    className="kontaktskjema-bekreftelse"
                    data-testid="bekreftelse"
                >
                    <div className="kontaktskjema-bekreftelse__innhold">
                        <Bekreftelseboks />
                        <HvaSkjerVidere />
                    </div>
                </div>
            </>
        );
    }
}

export default Bekreftelse;
