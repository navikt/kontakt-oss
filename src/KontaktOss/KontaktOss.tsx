import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Temaknapper from './Temaknapper/Temaknapper';
import ArbeidsgiverTlfInfo from './ArbeidsgiverTlfIInfo/ArbeidsgiverTlfInfo';
import Kontaktskjema from './Kontaktskjema/Kontaktskjema';
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
        const skalViseKontaktskjema = this.skalViseKontaktskjema(
            this.state.tema
        );
        const skalViseArbeidsgiverTlf =
            this.state.tema && !skalViseKontaktskjema;

        return (
            <div className="kontakt-oss">
                <Temaknapper
                    velgTema={this.velgTema}
                    valgtTema={this.state.tema}
                />
                {skalViseKontaktskjema && (
                    <Kontaktskjema tema={this.state.tema!} {...this.props} />
                )}
                {skalViseArbeidsgiverTlf && <ArbeidsgiverTlfInfo />}
            </div>
        );
    }
}

export default KontaktOss;
