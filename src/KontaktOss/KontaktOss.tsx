import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Temaknapper from './Temaknapper/Temaknapper';
import ArbeidsgiverTlfInfo from './ArbeidsgiverTlfIInfo/ArbeidsgiverTlfInfo';
import Kontaktskjema from './Kontaktskjema/Kontaktskjema';
import { scrollToBanner } from '../utils/scrollUtils';
import { Tema, TemaType } from '../utils/kontaktskjemaApi';
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

    hentSide = (tema?: Tema) => {
        if (!tema) {
            return null;
        }
        switch (tema.type) {
            case TemaType.REKRUTTERING_MED_TILRETTELEGGING:
            case TemaType.ARBEIDSTRENING:
            case TemaType.REKRUTTERING:
                return <Kontaktskjema tema={this.state.tema!} {...this.props} />;
            case TemaType.FOREBYGGE_SYKEFRAVÆR:
                return <div>IA-skjema</div>;
            case TemaType.OPPFØLGING_AV_EN_ARBEIDSTAKER:
            case TemaType.ANNET:
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
