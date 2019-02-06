import * as React from 'react';
import Bekreftelseboks from './Bekreftelseboks/Bekreftelseboks';
import BekreftelseLenkepanel from './bekreftelse-lenkepanel/bekreftelse-lenkepanel';
// TODO: Legg til Banner
// import Banner from '../../../../komponenter/banner/banner';
import { scrollToBanner } from '../../../utils/scrollUtils';
import './kontaktskjemabekreftelse.less';

class KontaktskjemaBekreftelse extends React.Component {
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

export default KontaktskjemaBekreftelse;
