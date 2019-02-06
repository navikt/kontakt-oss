import * as React from 'react';
import Bekreftelseboks from './Bekreftelseboks/Bekreftelseboks';
import BekreftelseLenkepanel from './LenkepanelBekreftelse/LenkepanelBekreftelse';
// TODO: Legg til Banner
// import Banner from '../../../../komponenter/banner/banner';
import { scrollToBanner } from '../../../utils/scrollUtils';
import './Bekreftelse.less';

class Bekreftelse extends React.Component {
    componentDidMount() {
        scrollToBanner();
    }

    render() {
        return (
            <>
                {/* TODO: Legg til Banner */}
                {/*<Banner banner="kontaktskjema" tittel="Kom i kontakt med NAV" />*/}
                <div className="kontaktskjema-bekreftelse">
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
