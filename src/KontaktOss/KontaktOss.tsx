import * as React from 'react';
// TODO: Legg til Banner
// import Banner from '../../komponenter/banner/banner';
import { RouteComponentProps } from 'react-router';
import Temaknapper from './Temaknapper/Temaknapper';
import ArbeidsgiverTlfInfo from './arbeidsgiverTlfIInfo/arbeidsgiverTlfInfo';
import KontaktSkjema from './kontaktskjema/KontaktSkjema';
import { scrollToBanner } from '../utils/scrollUtils';
import { Tema } from '../utils/kontaktskjemaApi';
import './KontaktOss.less';

interface State {
    tema?: Tema;
}

class KontaktOss extends React.Component<RouteComponentProps, State> {
    state = {
        tema: undefined,
    };

    componentDidMount() {
        scrollToBanner();
    }

    velgTema = (tema: Tema) => {
        this.setState({ tema });
    };

    skalViseKontaktskjema = (tema?: Tema) => {
        return (
            tema === 'Rekruttering' ||
            tema === 'Rekruttering med tilrettelegging' ||
            tema === 'Arbeidstrening'
        );
    };

    render() {
        const skalViseKontaktSkjema = this.skalViseKontaktskjema(
            this.state.tema
        );
        const skalViseArbeidsgiverTlf =
            this.state.tema && !skalViseKontaktSkjema;

        return (
            <>
                {/* TODO: Legg til Banner */}
                {/*<Banner banner="kontaktskjema" tittel="Kom i kontakt med NAV" />*/}
                <div className="kontakt-oss">
                    <Temaknapper
                        velgTema={this.velgTema}
                        valgtTema={this.state.tema}
                    />
                    {skalViseKontaktSkjema && (
                        <KontaktSkjema tema={this.state.tema} {...this.props} />
                    )}
                    {skalViseArbeidsgiverTlf && <ArbeidsgiverTlfInfo />}
                </div>
            </>
        );
    }
}

export default KontaktOss;
