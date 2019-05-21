import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SkjemaFelt } from './FellesFelter/FellesFelter';
import { Tema } from '../../utils/kontaktskjemaApi';
import './Kontaktskjema.less';
import { BEKREFTELSE_PATH } from '../../utils/paths';
import { Fylkesinndeling } from '../FylkesinndelingProvider';
import { Besvarelse, tomBesvarelse } from './besvarelse';
import { validerBesvarelseOgSendInn } from './kontaktskjemaUtils';

interface State {
    besvarelse: Besvarelse;
    feilmelding?: string;
    senderInn: boolean;
}

interface OwnProps {
    tema: Tema;
}

type Props = RouteComponentProps & Fylkesinndeling & OwnProps;

class KontaktskjemaStateContainer extends React.Component<Props, State> {
    state: State = {
        besvarelse: tomBesvarelse,
        senderInn: false,
    };

    oppdaterBesvarelse = (felt: SkjemaFelt, feltverdi: string | boolean) => {
        this.setState(
            {
                besvarelse: { ...this.state.besvarelse, [felt]: feltverdi },
            },
            this.fjernFeilmeldinger
        );
    };

    fjernFeilmeldinger = () => {
        this.setState({
            feilmelding: undefined,
        });
    };

    sendInnOnClick = async (event: any): Promise<void> => {
        event.preventDefault();

        if (this.state.senderInn) {
            return;
        } else {
            this.setState({ senderInn: true });
        }

        const sendInnResultat = await validerBesvarelseOgSendInn(
            this.state.besvarelse,
            this.props.tema
        );

        if (sendInnResultat.ok) {
            this.props.history.push(BEKREFTELSE_PATH);
        } else {
            this.setState({
                feilmelding: sendInnResultat.feilmelding,
                senderInn: false,
            });
        }
    };
}

export default KontaktskjemaStateContainer;
