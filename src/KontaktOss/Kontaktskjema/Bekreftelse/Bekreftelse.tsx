import * as React from 'react';
import Bekreftelseboks from './Bekreftelseboks/Bekreftelseboks';
import BekreftelseLenkepanel from './LenkepanelBekreftelse/LenkepanelBekreftelse';
import { scrollToBanner } from '../../../utils/scrollUtils';
import './Bekreftelse.less';

class Bekreftelse extends React.Component {
    componentDidMount() {
        scrollToBanner();
    }

    render() {
        return (
            <div className="kontaktskjema-bekreftelse">
                <div className="kontaktskjema-bekreftelse__innhold">
                    <Bekreftelseboks />
                    <BekreftelseLenkepanel />
                </div>
            </div>
        );
    }
}

export default Bekreftelse;
