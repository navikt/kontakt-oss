import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Temaknapper from './Temaknapper/Temaknapper';
import ArbeidsgiverTlfInfo from './ArbeidsgiverTlfIInfo/ArbeidsgiverTlfInfo';
import { scrollToBanner } from '../utils/scrollUtils';
import { Tema, TemaType } from '../utils/kontaktskjemaApi';
import './KontaktOss.less';
import KontaktskjemaStandard from './Kontaktskjema/KontaktskjemaStandard';
import KontaktskjemaSykefravær from './Kontaktskjema/KontaktskjemaSykefravær/KontaktskjemaSykefravær';

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

    hentSide = (tema?: Tema) => {
        if (!tema) {
            return null;
        }
        switch (tema.type) {
            case TemaType.RekrutteringMedTilrettelegging:
            case TemaType.Arbeidstrening:
            case TemaType.Rekruttering:
                return <KontaktskjemaStandard tema={this.state.tema!} {...this.props} />;
            case TemaType.ForebyggeSykefravær:
                return <KontaktskjemaSykefravær tema={this.state.tema!} {...this.props} />;
            case TemaType.OppfølgingAvEnArbeidstaker:
            case TemaType.Annet:
                return <ArbeidsgiverTlfInfo/>;
            default:
                return null;
        }
    };

    render() {
        return (
            <div className="kontakt-oss">
                <Temaknapper
                    velgTema={this.velgTema}
                    valgtTema={this.state.tema}
                />
                {this.hentSide(this.state.tema)}
            </div>
        );
    }
}

export default KontaktOss;
