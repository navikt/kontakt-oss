import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Temaknapper from './Temaknapper/Temaknapper';
import ArbeidsgiverTlfInfo from './ArbeidsgiverTlfIInfo/ArbeidsgiverTlfInfo';
import { scrollToBanner } from '../utils/scrollUtils';
import { Tema, TemaType } from '../utils/kontaktskjemaApi';
import './KontaktOss.less';
import KontaktskjemaContainer from './Kontaktskjema/KontaktskjemaContainer';
import Banner from '../Banner/Banner';

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
        } else if (
            tema.type === TemaType.OppfølgingAvEnArbeidstaker ||
            tema.type === TemaType.Annet
        ) {
            return <ArbeidsgiverTlfInfo />;
        } else {
            return (
                <KontaktskjemaContainer
                    tema={this.state.tema!}
                    {...this.props}
                />
            );
        }
    };

    render() {
        return (
            <>
                <Banner tekst="Kontaktskjema – arbeidsgiver" />
                <div className="kontakt-oss">
                    <Temaknapper
                        velgTema={this.velgTema}
                        valgtTema={this.state.tema}
                    />
                    {this.hentSide(this.state.tema)}
                </div>
            </>
        );
    }
}

export default KontaktOss;
