import * as React from 'react';
import Bekreftelseboks from './Bekreftelseboks/Bekreftelseboks';
import BekreftelseLenkepanel from './LenkepanelBekreftelse/LenkepanelBekreftelse';
import { scrollToBanner } from '../../../utils/scrollUtils';
import './Bekreftelse.less';
import Banner from '../../../Banner/Banner';

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
                        <BekreftelseLenkepanel />
                    </div>
                </div>
            </>
        );
    }
}

export default Bekreftelse;
